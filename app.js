/* Calendário de Pagamentos — núcleo compartilhado entre index.html e widget.html.
   Estrutura no localStorage:
   {
     payments: [
       { id, name, amount, day, recurring, notes, startMonth: "YYYY-MM",
         paid: { "YYYY-MM": true } }
     ]
   }
*/

const STORAGE_KEY = "kazu.payments.v1";
const MONTH_NAMES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Store = {
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { payments: [] };
            const data = JSON.parse(raw);
            if (!data.payments) data.payments = [];
            return data;
        } catch {
            return { payments: [] };
        }
    },
    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Notifica outras abas (incluindo o widget aberto em popup).
        try { localStorage.setItem(STORAGE_KEY + ".ping", String(Date.now())); } catch {}
    },
    onChange(cb) {
        window.addEventListener("storage", (e) => {
            if (e.key === STORAGE_KEY || e.key === STORAGE_KEY + ".ping") cb();
        });
    }
};

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function ymKey(year, month0) {
    return `${year}-${String(month0 + 1).padStart(2, "0")}`;
}

function daysInMonth(year, month0) {
    return new Date(year, month0 + 1, 0).getDate();
}

function formatBRL(n) {
    return (n || 0).toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });
}

/** Soma um valor que pode ser null (item sem valor definido). */
function sumAmount(acc, v) {
    return acc + (typeof v === "number" && !isNaN(v) ? v : 0);
}

function hasAmount(p) {
    return typeof p.amount === "number" && !isNaN(p.amount);
}

/** Compara duas chaves "YYYY-MM" → -1, 0, 1. */
function cmpMonthKey(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

/** Retorna lista de pagamentos efetivamente devidos num determinado mês.
 *  Cada item recebe `effectiveDay` (dia ajustado caso > último dia do mês)
 *  e `paid` (boolean) consultando o map por chave YYYY-MM.
 */
function paymentsForMonth(data, year, month0) {
    const key = ymKey(year, month0);
    const dim = daysInMonth(year, month0);
    return data.payments
        .filter(p => {
            if (p.recurring) {
                return !p.startMonth || cmpMonthKey(p.startMonth, key) <= 0;
            }
            return p.startMonth === key;
        })
        .map(p => ({
            ...p,
            effectiveDay: Math.min(p.day, dim),
            paid: !!(p.paid && p.paid[key])
        }))
        .sort((a, b) => a.effectiveDay - b.effectiveDay || a.name.localeCompare(b.name, "pt-BR"));
}

function togglePaid(data, paymentId, year, month0) {
    const key = ymKey(year, month0);
    const p = data.payments.find(x => x.id === paymentId);
    if (!p) return;
    if (!p.paid) p.paid = {};
    if (p.paid[key]) delete p.paid[key];
    else p.paid[key] = true;
    Store.save(data);
}

/* =====================================================================
   App principal (index.html)
   ===================================================================== */
function initApp() {
    let data = Store.load();
    const today = new Date();
    let view = { year: today.getFullYear(), month0: today.getMonth() };

    const el = (id) => document.getElementById(id);
    const monthLabel = el("monthLabel");
    const calendarGrid = el("calendarGrid");
    const paymentList = el("paymentList");
    const emptyHint = el("emptyHint");
    const dialog = el("paymentDialog");
    const form = el("paymentForm");

    function isSameMonth(y, m, ref) {
        return y === ref.getFullYear() && m === ref.getMonth();
    }
    function isPastDay(y, m, d, ref) {
        const a = new Date(y, m, d).setHours(0,0,0,0);
        const b = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).setHours(0,0,0,0);
        return a < b;
    }

    function render() {
        // Cabeçalho do mês.
        monthLabel.textContent = `${MONTH_NAMES[view.month0]} ${view.year}`;

        const list = paymentsForMonth(data, view.year, view.month0);
        renderSummary(list, view.year, view.month0);
        renderGrid(list);
        renderSide(list);
    }

    function renderSummary(list, y, m0) {
        let total = 0, paid = 0, due = 0, overdue = 0;
        let missing = 0;
        const now = new Date();
        for (const p of list) {
            if (!hasAmount(p)) missing++;
            total = sumAmount(total, p.amount);
            if (p.paid) paid = sumAmount(paid, p.amount);
            else {
                const past = isPastDay(y, m0, p.effectiveDay, now);
                if (past) overdue = sumAmount(overdue, p.amount);
                else due = sumAmount(due, p.amount);
            }
        }
        const suffix = missing > 0 ? ` · ${missing} sem valor` : "";
        el("monthTotal").textContent = formatBRL(total) + suffix;
        el("monthPaid").textContent = formatBRL(paid);
        el("monthDue").textContent = formatBRL(due);
        el("monthOverdue").textContent = formatBRL(overdue);
    }

    function renderGrid(list) {
        calendarGrid.innerHTML = "";
        const first = new Date(view.year, view.month0, 1);
        const startDow = first.getDay();
        const dim = daysInMonth(view.year, view.month0);
        const now = new Date();

        // Agrupa pagamentos por dia para inserir pílulas.
        const byDay = new Map();
        for (const p of list) {
            const arr = byDay.get(p.effectiveDay) || [];
            arr.push(p);
            byDay.set(p.effectiveDay, arr);
        }

        // Espaços vazios antes do dia 1.
        for (let i = 0; i < startDow; i++) {
            const cell = document.createElement("div");
            cell.className = "day muted";
            calendarGrid.appendChild(cell);
        }
        // Dias do mês.
        for (let d = 1; d <= dim; d++) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "day";
            if (isSameMonth(view.year, view.month0, now) && d === now.getDate()) {
                btn.classList.add("today");
            }
            const num = document.createElement("span");
            num.className = "num";
            num.textContent = d;
            btn.appendChild(num);

            const pills = document.createElement("div");
            pills.className = "day-pills";
            const items = byDay.get(d) || [];
            for (const p of items.slice(0, 3)) {
                const pill = document.createElement("span");
                pill.className = "pill";
                if (p.paid) pill.classList.add("paid");
                else if (isPastDay(view.year, view.month0, d, now)) pill.classList.add("overdue");
                if (p.recurring) pill.classList.add("recurring");
                pill.textContent = hasAmount(p) ? `${p.name} · ${formatBRL(p.amount)}` : p.name;
                pills.appendChild(pill);
            }
            if (items.length > 3) {
                const more = document.createElement("span");
                more.className = "pill";
                more.style.background = "transparent";
                more.style.color = "var(--muted)";
                more.style.borderLeftColor = "var(--muted)";
                more.textContent = `+${items.length - 3} mais`;
                pills.appendChild(more);
            }
            btn.appendChild(pills);

            btn.addEventListener("click", () => openDialogForNew(d));
            calendarGrid.appendChild(btn);
        }
    }

    function renderSide(list) {
        paymentList.innerHTML = "";
        if (list.length === 0) {
            emptyHint.classList.remove("hidden");
            return;
        }
        emptyHint.classList.add("hidden");
        const now = new Date();

        for (const p of list) {
            const li = document.createElement("li");
            if (p.paid) li.classList.add("is-paid");
            else if (isPastDay(view.year, view.month0, p.effectiveDay, now)) li.classList.add("is-overdue");

            const check = document.createElement("input");
            check.type = "checkbox";
            check.className = "check";
            check.checked = p.paid;
            check.title = p.paid ? "Marcar como não pago" : "Marcar como pago";
            check.addEventListener("change", () => {
                togglePaid(data, p.id, view.year, view.month0);
                render();
            });

            const info = document.createElement("div");
            info.className = "info";
            info.innerHTML = `
                <div class="name">${escapeHtml(p.name)}${p.recurring ? " ↻" : ""}</div>
                <div class="meta">Dia ${p.effectiveDay}${p.notes ? " · " + escapeHtml(p.notes) : ""}</div>
            `;
            info.addEventListener("click", () => openDialogForEdit(p.id));

            const amount = document.createElement("span");
            amount.className = "amount";
            if (hasAmount(p)) {
                amount.textContent = formatBRL(p.amount);
            } else {
                amount.textContent = "—";
                amount.classList.add("muted-amount");
                amount.title = "Sem valor definido";
            }

            li.append(check, info, amount);
            paymentList.appendChild(li);
        }
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    /* ----- Dialog ----- */
    function openDialogForNew(day) {
        form.reset();
        el("paymentId").value = "";
        el("dialogTitle").textContent = "Novo pagamento";
        el("deleteBtn").hidden = true;
        el("day").value = day || new Date().getDate();
        el("recurring").checked = false;
        dialog.showModal();
        setTimeout(() => el("name").focus(), 30);
    }

    function openDialogForEdit(id) {
        const p = data.payments.find(x => x.id === id);
        if (!p) return;
        el("paymentId").value = p.id;
        el("dialogTitle").textContent = "Editar pagamento";
        el("deleteBtn").hidden = false;
        el("name").value = p.name;
        el("amount").value = hasAmount(p) ? p.amount : "";
        el("day").value = p.day;
        el("recurring").checked = !!p.recurring;
        el("notes").value = p.notes || "";
        dialog.showModal();
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = el("paymentId").value;
        const name = el("name").value.trim();
        const rawAmount = el("amount").value.trim();
        const amount = rawAmount === "" ? null : parseFloat(rawAmount);
        const day = Math.max(1, Math.min(31, parseInt(el("day").value, 10) || 1));
        const recurring = el("recurring").checked;
        const notes = el("notes").value.trim();
        if (!name) return;
        if (rawAmount !== "" && isNaN(amount)) return;

        if (id) {
            const p = data.payments.find(x => x.id === id);
            if (p) Object.assign(p, { name, amount, day, recurring, notes });
        } else {
            data.payments.push({
                id: uid(),
                name, amount, day, recurring, notes,
                startMonth: ymKey(view.year, view.month0),
                paid: {}
            });
        }
        Store.save(data);
        dialog.close();
        render();
    });

    el("deleteBtn").addEventListener("click", () => {
        const id = el("paymentId").value;
        if (!id) return;
        if (!confirm("Excluir este pagamento? Se for recorrente, todos os meses serão removidos.")) return;
        data.payments = data.payments.filter(p => p.id !== id);
        Store.save(data);
        dialog.close();
        render();
    });

    el("cancelBtn").addEventListener("click", () => dialog.close());
    el("closeDialog").addEventListener("click", () => dialog.close());

    /* ----- Navegação ----- */
    el("prevMonth").addEventListener("click", () => {
        view.month0--;
        if (view.month0 < 0) { view.month0 = 11; view.year--; }
        render();
    });
    el("nextMonth").addEventListener("click", () => {
        view.month0++;
        if (view.month0 > 11) { view.month0 = 0; view.year++; }
        render();
    });
    el("todayBtn").addEventListener("click", () => {
        const n = new Date();
        view = { year: n.getFullYear(), month0: n.getMonth() };
        render();
    });
    el("addBtn").addEventListener("click", () => openDialogForNew());

    /* ----- Widget popup ----- */
    el("openWidget").addEventListener("click", () => {
        const w = 360, h = 560;
        const left = (screen.availWidth || screen.width) - w - 40;
        const top = 80;
        window.open("widget.html", "PagamentosWidget",
            `popup=yes,width=${w},height=${h},left=${left},top=${top}`);
    });

    /* ----- Sync entre abas ----- */
    Store.onChange(() => { data = Store.load(); render(); });

    render();
}

/* =====================================================================
   Widget (widget.html)
   ===================================================================== */
function initWidget() {
    let data = Store.load();

    const el = (id) => document.getElementById(id);
    const listEl = el("widgetList");
    const emptyEl = el("widgetEmpty");
    const monthEl = el("widgetMonth");
    const totalEl = el("widgetTotal");
    const dueEl = el("widgetDue");

    function render() {
        const now = new Date();
        const year = now.getFullYear();
        const month0 = now.getMonth();
        monthEl.textContent = `${MONTH_NAMES[month0]} ${year}`;

        const list = paymentsForMonth(data, year, month0);
        let total = 0, due = 0, missing = 0;
        for (const p of list) {
            if (!hasAmount(p)) missing++;
            total = sumAmount(total, p.amount);
            if (!p.paid) due = sumAmount(due, p.amount);
        }
        const suffix = missing > 0 ? ` +${missing}?` : "";
        totalEl.textContent = formatBRL(total) + suffix;
        dueEl.textContent = formatBRL(due);

        listEl.innerHTML = "";
        if (list.length === 0) {
            emptyEl.style.display = "block";
            listEl.style.display = "none";
            return;
        }
        emptyEl.style.display = "none";
        listEl.style.display = "";

        const todayD = now.getDate();
        for (const p of list) {
            const li = document.createElement("li");
            if (p.paid) li.classList.add("is-paid");
            else if (p.effectiveDay < todayD) li.classList.add("is-overdue");

            const check = document.createElement("input");
            check.type = "checkbox";
            check.className = "check";
            check.checked = p.paid;
            check.addEventListener("change", () => {
                togglePaid(data, p.id, year, month0);
                render();
            });

            const chip = document.createElement("div");
            chip.className = "day-chip";
            chip.textContent = p.effectiveDay;

            const info = document.createElement("div");
            info.style.minWidth = "0";
            info.innerHTML = `
                <div class="name">${escapeHtml(p.name)}${p.recurring ? " ↻" : ""}</div>
                <div class="sub">Dia ${p.effectiveDay}${p.paid ? " · pago" : (p.effectiveDay < todayD ? " · atrasado" : "")}</div>
            `;

            const amount = document.createElement("span");
            amount.className = "amount";
            if (hasAmount(p)) {
                amount.textContent = formatBRL(p.amount);
            } else {
                amount.textContent = "—";
                amount.classList.add("muted-amount");
                amount.title = "Sem valor definido";
            }

            // Layout: check, chip, info, amount → ajusta grid dinamicamente.
            li.style.gridTemplateColumns = "auto auto 1fr auto";
            li.append(check, chip, info, amount);
            listEl.appendChild(li);
        }
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    el("openApp").addEventListener("click", () => {
        if (window.opener && !window.opener.closed) window.opener.focus();
        else window.open("index.html", "_blank");
    });
    el("refresh").addEventListener("click", () => { data = Store.load(); render(); });
    const closeBtn = el("closeWidget");
    if (closeBtn) closeBtn.addEventListener("click", () => window.close());

    Store.onChange(() => { data = Store.load(); render(); });
    // Atualiza periodicamente para refletir mudança de dia (atrasos).
    setInterval(() => { data = Store.load(); render(); }, 60_000);

    render();
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.body.classList.contains("widget")) initWidget();
    else if (document.body.classList.contains("app")) initApp();
});
