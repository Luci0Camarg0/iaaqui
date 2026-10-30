// Demonstração de atendente virtual. Roda só no navegador: sem API e sem chave.
// Número da IAqui com DDI e DDD. Texto do link sem acentos (acentos quebram o wa.me em alguns aparelhos).
const WHATSAPP = "5517992693807";

const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ---------- Negócios de exemplo (fictícios) ----------
const NEGOCIOS = {
  clinica: {
    nome: "Clínica Sorriso Vivo",
    emoji: "🦷",
    atendente: "Camila",
    cliente: "paciente",
    ola: "Olá! 😊 Aqui é a assistente virtual da *Clínica Sorriso Vivo*. Posso tirar dúvidas, enviar um orçamento ou marcar sua consulta. Como posso ajudar?",
    horario: "Atendemos de *segunda a sexta, das 8h às 19h*, e aos *sábados, das 8h às 12h*.",
    endereco: "Estamos na *Av. das Flores, 1200, sala 4, Centro*. Tem estacionamento conveniado em frente, com 1 hora grátis para pacientes. 🚗",
    pagamento: "Aceitamos *Pix, dinheiro, débito e crédito em até 10x sem juros*. Também atendemos os principais convênios odontológicos: me diga qual é o seu que eu confiro.",
    agendaDias: [1, 2, 3, 4, 5, 6],
    horas: ["08:30", "10:00", "14:00", "16:30", "18:00"],
    horasSabado: ["08:30", "10:00", "11:00"],
    servicos: [
      { id: "avaliacao", nome: "Avaliação", preco: 0, txt: "gratuita", agenda: true, kw: ["avaliacao", "consulta", "primeira vez"] },
      { id: "limpeza", nome: "Limpeza (profilaxia)", preco: 180, agenda: true, kw: ["limpeza", "profilaxia", "tartaro"] },
      { id: "clareamento", nome: "Clareamento", preco: 890, agenda: true, kw: ["clareamento", "clarear", "branco", "amarelado"] },
      { id: "restauracao", nome: "Restauração", preco: 220, desde: true, agenda: true, kw: ["restauracao", "carie", "obturacao", "dente quebrado"] },
      { id: "canal", nome: "Tratamento de canal", preco: 650, desde: true, agenda: true, kw: ["canal"] },
      { id: "aparelho", nome: "Manutenção de aparelho", preco: 150, agenda: true, kw: ["aparelho", "ortodont", "manutencao"] },
    ],
    faq: [
      { kw: ["crianca", "filho", "filha", "infantil", "odontopediatr"], r: "Sim! Temos *odontopediatra* às terças e quintas. A primeira avaliação da criança também é gratuita. 👧" },
      { kw: ["doi", "dor na limpeza", "anestesia", "medo"], r: "Fique tranquilo(a): os procedimentos são feitos com anestesia quando necessário e a equipe é acostumada com pacientes que têm receio de dentista. A limpeza normalmente não dói." },
      { kw: ["convenio", "plano odontologico", "plano dental"], r: "Atendemos os principais convênios odontológicos. Me diga o nome do seu que eu verifico a cobertura. Se não tiver convênio, parcelamos em até 10x sem juros." },
      { kw: ["quanto tempo", "demora", "duracao"], r: "A avaliação leva uns 30 minutos e a limpeza cerca de 40. Clareamento e canal dependem de cada caso: o dentista explica tudo na avaliação." },
    ],
    urgencia: ["dor forte", "muita dor", "dor de dente", "inchad", "sangr", "urgente", "urgencia", "emergencia", "quebrei", "caiu"],
    msgUrgencia: "Sinto muito que você esteja com dor. 😟 Casos de dor têm *prioridade de encaixe ainda hoje*. Vou chamar a nossa recepção agora para achar o primeiro horário livre.",
  },

  academia: {
    nome: "Academia Movimento",
    emoji: "💪",
    atendente: "Rafael",
    cliente: "aluno",
    ola: "E aí, tudo bem? 💪 Aqui é o assistente virtual da *Academia Movimento*. Posso te passar planos e preços, marcar uma *aula experimental grátis* ou tirar qualquer dúvida.",
    horario: "Funcionamos de *segunda a sexta, das 5h30 às 23h*, aos *sábados, das 8h às 14h*, e aos *domingos, das 8h às 12h*.",
    endereco: "Ficamos na *Rua dos Esportes, 450, Jardim Paulista*. Temos estacionamento próprio e gratuito para alunos. 🚗",
    pagamento: "Aceitamos *Pix, débito e crédito*. Nos planos trimestral e anual dá para parcelar no cartão sem juros, e *não cobramos taxa de matrícula*.",
    agendaDias: [0, 1, 2, 3, 4, 5, 6],
    horas: ["06:00", "07:30", "12:00", "18:00", "19:30"],
    horasSabado: ["08:30", "10:00", "12:00"],
    servicos: [
      { id: "experimental", nome: "Aula experimental", preco: 0, txt: "grátis", agenda: true, kw: ["experimental", "aula gratis", "conhecer", "testar"] },
      { id: "mensal", nome: "Plano mensal", preco: 119, sufixo: "/mês", kw: ["mensal"] },
      { id: "trimestral", nome: "Plano trimestral", preco: 99, sufixo: "/mês", kw: ["trimestral"] },
      { id: "anual", nome: "Plano anual", preco: 79, sufixo: "/mês", kw: ["anual"] },
      { id: "avaliacao", nome: "Avaliação física", preco: 60, agenda: true, kw: ["avaliacao", "bioimpedancia", "medidas"] },
      { id: "personal", nome: "Personal (pacote 8 aulas)", preco: 480, kw: ["personal"] },
    ],
    faq: [
      { kw: ["aula coletiva", "aulas coletivas", "spinning", "funcional", "yoga", "zumba", "danca"], r: "Temos aulas coletivas inclusas em todos os planos: *funcional, spinning, yoga e dança*. A grade completa eu envio aqui se quiser. 🗓️" },
      { kw: ["matricula", "taxa"], r: "*Não cobramos taxa de matrícula.* Você paga só o plano escolhido." },
      { kw: ["cancelar", "fidelidade", "multa"], r: "O plano mensal não tem fidelidade: dá para cancelar quando quiser. Trimestral e anual têm o desconto justamente pelo período fechado." },
      { kw: ["iniciante", "nunca treinei", "sedentario", "comecando"], r: "Perfeito para começar! Todo aluno novo recebe *treino montado por um professor* e acompanhamento nas primeiras semanas. Quer marcar uma aula experimental?" },
      { kw: ["lotad", "cheia", "movimento"], r: "Os horários mais tranquilos são das *9h às 11h* e das *14h às 16h*. O pico é entre 18h e 20h." },
    ],
    urgencia: ["machuquei", "lesao", "acidente", "passei mal"],
    msgUrgencia: "Poxa, sinto muito! 😟 Vou chamar a coordenação agora para te dar atenção direta.",
  },

  pet: {
    nome: "Amigo Fiel Pet & Vet",
    emoji: "🐾",
    atendente: "Juliana",
    cliente: "tutor",
    ola: "Oi! 🐶🐱 Aqui é a assistente virtual da *Amigo Fiel Pet & Vet*. Posso agendar banho e tosa, consultas, passar preços ou tirar dúvidas. Como posso ajudar?",
    horario: "Abrimos de *segunda a sábado, das 8h às 18h*. A clínica veterinária atende *plantão 24h* para emergências.",
    endereco: "Estamos na *Rua das Palmeiras, 87, Vila Nova*. Também temos *leva e traz* por R$ 15 (até 5 km). 🚐",
    pagamento: "Aceitamos *Pix, débito e crédito em até 3x*. Pacotes mensais de banho têm desconto.",
    agendaDias: [1, 2, 3, 4, 5, 6],
    horas: ["08:30", "10:00", "13:30", "15:00", "16:30"],
    horasSabado: ["08:30", "10:00", "11:30"],
    servicos: [
      { id: "banho-p", nome: "Banho (porte pequeno)", preco: 55, agenda: true, kw: ["banho pequeno", "pequeno porte", "porte pequeno"] },
      { id: "banho-m", nome: "Banho (porte médio)", preco: 70, agenda: true, kw: ["banho medio", "medio porte", "porte medio"] },
      { id: "banho-g", nome: "Banho (porte grande)", preco: 90, agenda: true, kw: ["banho grande", "grande porte", "porte grande"] },
      { id: "tosa", nome: "Tosa higiênica", preco: 45, agenda: true, kw: ["tosa"] },
      { id: "consulta", nome: "Consulta veterinária", preco: 150, agenda: true, kw: ["consulta", "veterinari"] },
      { id: "vacina", nome: "Vacina V10", preco: 110, agenda: true, kw: ["vacina", "v10", "vacinar"] },
      { id: "levatraz", nome: "Leva e traz", preco: 15, kw: ["leva e traz", "buscar", "busca"] },
    ],
    faq: [
      { kw: ["banho"], r: "Banho: *R$ 55* (porte pequeno), *R$ 70* (médio) e *R$ 90* (grande). Tosa higiênica sai por *R$ 45*. Qual o porte do seu pet?" },
      { kw: ["gato", "gatos", "felino"], r: "Atendemos gatos sim! 🐱 Temos horário exclusivo para felinos, sem cachorro na sala, para o bichano ficar tranquilo." },
      { kw: ["racao", "petisco", "produto", "loja"], r: "Temos loja com rações, petiscos, brinquedos e acessórios. Se quiser, separo um produto e você retira ou recebe com o leva e traz." },
      { kw: ["castra", "cirurgia"], r: "Fazemos castração e outras cirurgias. O valor depende de espécie, porte e exames. O ideal é começar com uma consulta: quer agendar?" },
      { kw: ["bravo", "agressivo", "morde", "medroso"], r: "Sem problema! A equipe é treinada para pets ansiosos ou bravos. Avise no agendamento que separamos um horário mais calmo." },
    ],
    urgencia: ["envenen", "atropel", "convuls", "sangr", "nao respira", "emergencia", "urgente", "urgencia", "vomitando", "passando mal"],
    msgUrgencia: "Isso é uma emergência! 🚨 Nosso plantão veterinário é 24h. Vou chamar a equipe agora mesmo. Se puder, já venha para a *Rua das Palmeiras, 87*.",
  },
};

// ---------- Utilidades ----------
const $ = (s) => document.querySelector(s);
const chat = $("#chat");
const chipsEl = $("#chips");
const input = $("#msg");

const norm = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
// Casa pelo começo da palavra ("obrigad" pega "obrigada"), sem pegar pedaços do meio ("oi" não casa com "noite")
const has = (t, words) => words.some((w) => (" " + t).includes(" " + w));
const esc = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (t) => esc(t).replace(/\*([^*]+)\*/g, "<b>$1</b>");
const hora = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const precoTxt = (s) => s.txt ? s.txt : (s.desde ? "a partir de " : "") + brl(s.preco) + (s.sufixo || "");

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function proximosDias(neg, n = 4) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (neg.agendaDias.includes(d.getDay())) out.push(new Date(d));
  }
  return out;
}
const diaTxt = (d) => `${DIAS[d.getDay()]}, ${d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;

// ---------- Estado ----------
let neg, st, fila = Promise.resolve(), sessao = 0;

function novoEstado() {
  return { fluxo: null, itens: [], agenda: {}, naoEntendi: 0, humano: false, historico: [] };
}

// ---------- Renderização ----------
function rolar() { chat.scrollTop = chat.scrollHeight; }

function addBolha(lado, html, extra = "") {
  const el = document.createElement("div");
  el.className = `msg ${lado} ${extra}`;
  const tick = lado === "out" ? '<span class="tick">✓✓</span>' : "";
  el.innerHTML = `${html}<span class="meta">${hora()}${tick}</span>`;
  chat.appendChild(el);
  rolar();
  return el;
}

function addNota(texto) {
  const el = document.createElement("div");
  el.className = "note";
  el.innerHTML = fmt(texto);
  chat.appendChild(el);
  rolar();
}

function setChips(lista) {
  chipsEl.innerHTML = "";
  lista.forEach((c) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.textContent = c;
    b.onclick = () => enviar(c);
    chipsEl.appendChild(b);
  });
}

// Enfileira respostas do bot com "digitando..." para parecer natural
function bot(conteudo, { card = false, autor = null } = {}) {
  const s = sessao;
  fila = fila.then(async () => {
    if (s !== sessao) return;
    const typing = document.createElement("div");
    typing.className = "typing";
    typing.innerHTML = "<i></i><i></i><i></i>";
    chat.appendChild(typing);
    rolar();
    const tam = typeof conteudo === "string" ? conteudo.length : 120;
    await sleep(Math.min(450 + tam * 9, 1500));
    typing.remove();
    if (s !== sessao) return;
    const tag = autor ? `<span class="who-tag">${esc(autor)}</span>` : "";
    if (card) addBolha("in", conteudo, "card-msg");
    else addBolha("in", tag + fmt(conteudo));
  });
  return fila;
}

function chipsDepois(lista) {
  const s = sessao;
  fila = fila.then(() => { if (s === sessao) setChips(lista); });
}
function notaDepois(texto) {
  const s = sessao;
  fila = fila.then(async () => { await sleep(300); if (s === sessao) addNota(texto); });
}

const CHIPS_INICIO = ["Qual o horário?", "Quanto custa?", "Quero um orçamento", "Quero agendar", "Falar com atendente"];

// ---------- Início ----------
function iniciar(id) {
  sessao++;
  fila = Promise.resolve();
  neg = NEGOCIOS[id];
  st = novoEstado();
  document.querySelectorAll(".pick").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.biz === id)));
  $("#avatar").textContent = neg.emoji;
  $("#biz-name").textContent = neg.nome;
  $("#biz-status").textContent = "online";
  chat.innerHTML = '<div class="day">HOJE</div>';
  setChips([]);
  addNota(`Conversa de demonstração. *${neg.nome}* é uma empresa fictícia. Escreva como um cliente ou toque nas sugestões.`);
  bot(neg.ola);
  chipsDepois(CHIPS_INICIO);
  try { localStorage.setItem("iaqui-demo-biz", id); } catch (e) {}
}

// ---------- Entrada do usuário ----------
function enviar(texto) {
  texto = texto.trim();
  if (!texto) return;
  addBolha("out", esc(texto));
  st.historico.push(texto);
  setChips([]);
  input.value = "";
  responder(texto);
}

$("#composer").addEventListener("submit", (e) => {
  e.preventDefault();
  enviar(input.value);
});

// ---------- Cérebro ----------
function acharServico(t) {
  return neg.servicos.find((s) => has(t, s.kw) || t.includes(norm(s.nome)));
}

function responder(texto) {
  const t = norm(texto);

  if (st.humano) return respostaHumano(t);

  // Pedidos que mudam de assunto a qualquer momento
  if (has(t, neg.urgencia)) return passarHumano("urgencia");
  if (has(t, ["atendente", "humano", "pessoa", "alguem", "gerente", "responsavel", "reclama", "falar com voce"])) return passarHumano("pedido");
  if (t === "recomecar" || t === "menu" || t === "voltar ao inicio") { st.fluxo = null; bot("Claro! Em que mais posso ajudar?"); return chipsDepois(CHIPS_INICIO); }

  // Fluxos guiados
  if (st.fluxo === "orc") return fluxoOrcamento(t);
  if (st.fluxo?.startsWith("ag")) return fluxoAgenda(t, texto);

  // Intenções
  if (has(t, ["orcamento", "orcar", "cotacao"])) return comecarOrcamento();
  if (has(t, ["agendar", "agenda", "marcar", "horario disponivel", "vaga", "reservar"])) return comecarAgenda(acharServico(t));

  const resps = [];
  if (has(t, ["horario", "abre", "fecha", "funciona", "aberto", "domingo", "sabado", "feriado"])) resps.push(neg.horario);
  if (has(t, ["endereco", "onde fica", "onde voces", "localiza", "como chego", "estaciona", "fica onde"])) resps.push(neg.endereco);
  if (has(t, ["pagamento", "pagar", "pix", "cartao", "parcel", "credito", "debito", "dinheiro"])) resps.push(neg.pagamento);
  neg.faq.forEach((f) => { if (has(t, f.kw)) resps.push(f.r); });

  const serv = acharServico(t);
  if (serv && !resps.length) {
    bot(`*${serv.nome}*: ${precoTxt(serv)}.` + (serv.desde ? " O valor final depende da avaliação." : ""));
    if (serv.agenda) { bot("Quer que eu já veja um horário para você?"); chipsDepois([`Agendar ${serv.nome.toLowerCase()}`, "Quero um orçamento", "Outra dúvida"]); }
    else chipsDepois(["Quero um orçamento", "Quero agendar", "Outra dúvida"]);
    return;
  }

  if (has(t, ["preco", "valor", "quanto", "custa", "tabela", "plano", "servicos", "o que voces fazem"])) {
    const linhas = neg.servicos.map((s) => `${s.nome}: *${precoTxt(s)}*`).join("\n");
    resps.push(`Segue nossa tabela:\n\n${linhas}`);
  }

  if (resps.length) {
    resps.forEach((r) => bot(r));
    st.naoEntendi = 0;
    return chipsDepois(["Quero um orçamento", "Quero agendar", "Onde fica?", "Formas de pagamento"]);
  }

  if (has(t, ["obrigad", "valeu", "agradeco", "show", "perfeito", "otimo"])) {
    bot("Imagina! 😊 Se precisar de algo, é só chamar por aqui. Estou disponível 24 horas.");
    return chipsDepois(CHIPS_INICIO);
  }
  if (has(t, ["oi", "ola", "bom dia", "boa tarde", "boa noite", "tudo bem", "opa", "eai", "e ai"])) {
    bot("Olá! Tudo ótimo por aqui. 😊 Posso te passar preços, horários, montar um orçamento ou marcar um horário. O que você precisa?");
    return chipsDepois(CHIPS_INICIO);
  }
  if (has(t, ["outra duvida", "duvida"])) {
    bot("Pode perguntar! Sobre horário, endereço, preços, pagamento ou qualquer serviço.");
    return chipsDepois(["Qual o horário?", "Onde fica?", "Formas de pagamento", "Quanto custa?"]);
  }

  // Não entendeu: tenta ajudar e, na segunda vez, oferece um humano
  st.naoEntendi++;
  if (st.naoEntendi >= 2) {
    bot("Essa eu prefiro não arriscar responder errado. 🙂 Quer que eu chame alguém da equipe para te ajudar?");
    return chipsDepois(["Sim, chamar atendente", "Não, outra dúvida"]);
  }
  bot("Não entendi muito bem. 🤔 Posso te ajudar com horários, endereço, preços, orçamento ou agendamento.");
  chipsDepois(CHIPS_INICIO);
}

// ---------- Orçamento ----------
function comecarOrcamento() {
  st.fluxo = "orc";
  st.itens = [];
  bot("Vamos montar seu orçamento! 📝 Qual serviço você quer incluir?");
  chipsDepois(neg.servicos.filter((s) => s.preco > 0).map((s) => s.nome));
}

function fluxoOrcamento(t) {
  if (has(t, ["fechar", "so isso", "pronto", "finalizar", "nao", "gerar"])) {
    if (!st.itens.length) { bot("Escolha pelo menos um serviço para eu montar o orçamento. 🙂"); return chipsDepois(neg.servicos.filter((s) => s.preco > 0).map((s) => s.nome)); }
    return enviarOrcamento();
  }
  const s = acharServico(t);
  if (!s) {
    // Mudou de assunto no meio do orçamento: sai do fluxo e responde normalmente
    st.fluxo = null;
    return responder(t);
  }
  if (!st.itens.includes(s)) st.itens.push(s);
  bot(`Anotado: *${s.nome}* (${precoTxt(s)}). Quer incluir mais alguma coisa?`);
  const resto = neg.servicos.filter((x) => x.preco > 0 && !st.itens.includes(x)).map((x) => x.nome);
  chipsDepois(["Fechar orçamento", ...resto]);
}

function enviarOrcamento() {
  st.fluxo = null;
  const total = st.itens.reduce((a, s) => a + s.preco, 0);
  const temDesde = st.itens.some((s) => s.desde);
  const validade = new Date(); validade.setDate(validade.getDate() + 7);
  const num = String(Math.floor(1000 + Math.random() * 9000));
  const linhas = st.itens.map((s) => `<div class="row"><span>${esc(s.nome)}</span><span>${esc(precoTxt(s))}</span></div>`).join("");
  const html =
    `<div class="card-top">📄 Orçamento nº ${num} · ${esc(neg.nome)}</div>` +
    `<div class="card-body">${linhas}` +
    `<div class="row total"><span>Total${temDesde ? " estimado" : ""}</span><span>${brl(total)}</span></div>` +
    `<div class="small">Válido até ${validade.toLocaleDateString("pt-BR")}. ${neg.pagamento.includes("10x") ? "Parcelamos em até 10x sem juros." : ""}${temDesde ? " Itens “a partir de” são confirmados na avaliação." : ""}</div></div>`;
  bot("Prontinho! Aqui está o seu orçamento:");
  bot(html, { card: true });
  bot("Quer que eu já reserve um horário?");
  chipsDepois(["Sim, agendar", "Falar com atendente", "Outra dúvida"]);
}

// ---------- Agendamento ----------
function comecarAgenda(serv) {
  st.agenda = {};
  const agendaveis = neg.servicos.filter((s) => s.agenda);
  if (!serv && st.itens.length) serv = st.itens.find((s) => s.agenda);
  if (serv && serv.agenda) return escolherServico(serv);
  st.fluxo = "ag-servico";
  bot("Claro! Para qual serviço você quer agendar?");
  chipsDepois(agendaveis.map((s) => s.nome));
}

function escolherServico(serv) {
  st.agenda.servico = serv;
  st.fluxo = "ag-dia";
  st.agenda.dias = proximosDias(neg);
  bot(`*${serv.nome}*, ótimo! Tenho horários nestes dias. Qual fica melhor?`);
  chipsDepois(st.agenda.dias.map(diaTxt));
}

function fluxoAgenda(t, original) {
  if (st.fluxo === "ag-servico") {
    const s = acharServico(t);
    if (s && s.agenda) return escolherServico(s);
    if (s) { bot(`*${s.nome}* não precisa de agendamento. Escolha um destes:`); return chipsDepois(neg.servicos.filter((x) => x.agenda).map((x) => x.nome)); }
    st.fluxo = null;
    return responder(t);
  }
  if (st.fluxo === "ag-dia") {
    let d = st.agenda.dias.find((x) => t.includes(norm(diaTxt(x))) || t.includes(norm(DIAS[x.getDay()])));
    if (!d && has(t, ["amanha"])) d = st.agenda.dias[0];
    if (!d && /\d/.test(t)) { bot("Nesse dia não tenho vaga. Escolha um dos dias disponíveis:"); return chipsDepois(st.agenda.dias.map(diaTxt)); }
    if (!d) { st.fluxo = null; return responder(t); }
    st.agenda.dia = d;
    st.fluxo = "ag-hora";
    const horas = d.getDay() === 6 || d.getDay() === 0 ? neg.horasSabado : neg.horas;
    st.agenda.horas = horas;
    bot(`Para ${diaTxt(d)} tenho estes horários livres:`);
    return chipsDepois(horas);
  }
  if (st.fluxo === "ag-hora") {
    const m = t.match(/(\d{1,2})(?:[:h ](\d{2}))?/);
    let h = null;
    if (m) {
      const alvo = `${m[1].padStart(2, "0")}:${m[2] || "00"}`;
      h = st.agenda.horas.find((x) => x === alvo) || st.agenda.horas.find((x) => x.startsWith(m[1].padStart(2, "0")));
    }
    if (!h && !m) { st.fluxo = null; return responder(t); }
    if (!h) { bot("Esse horário já está ocupado. 😕 Pode escolher um destes?"); return chipsDepois(st.agenda.horas); }
    st.agenda.hora = h;
    st.fluxo = "ag-nome";
    bot(`Reservei *${h}* para você. Para confirmar, qual o seu nome${neg.cliente === "tutor" ? " e o nome do pet" : ""}?`);
    return;
  }
  if (st.fluxo === "ag-nome") {
    st.agenda.nome = original.slice(0, 60);
    st.fluxo = null;
    const a = st.agenda;
    const html =
      `<div class="card-top">✅ Agendamento confirmado</div>` +
      `<div class="card-body">` +
      `<div class="row"><span>Nome</span><span>${esc(a.nome)}</span></div>` +
      `<div class="row"><span>Serviço</span><span>${esc(a.servico.nome)}</span></div>` +
      `<div class="row"><span>Quando</span><span>${esc(diaTxt(a.dia))}, ${a.hora}</span></div>` +
      `<div class="row"><span>Onde</span><span>${esc(neg.nome)}</span></div>` +
      `<div class="small">Vou te mandar um lembrete um dia antes. Se precisar remarcar, é só responder aqui.</div></div>`;
    bot(`Perfeito, ${a.nome.split(" ")[0]}! 🎉`);
    bot(html, { card: true });
    notaDepois("Na versão real, o horário entra direto na agenda da empresa (Google Agenda ou o sistema que ela já usa) e o lembrete é enviado sozinho.");
    bot("Posso ajudar em mais alguma coisa?");
    chipsDepois(["Onde fica?", "Formas de pagamento", "Falar com atendente", "Não, obrigado!"]);
  }
}

// ---------- Passagem para humano ----------
function passarHumano(motivo) {
  st.fluxo = null;
  st.humano = true;
  if (motivo === "urgencia") bot(neg.msgUrgencia);
  else bot(`Claro! Vou chamar alguém da nossa equipe. Já passei o resumo da conversa, então você não vai precisar repetir nada. 😉`);

  const ultimos = st.historico.slice(-3).map((h) => `<div class="row"><span>“${esc(h.slice(0, 70))}”</span></div>`).join("");
  const extra = [
    st.itens.length ? `<div class="row"><span>Orçamento</span><span>${esc(st.itens.map((s) => s.nome).join(", "))}</span></div>` : "",
    st.agenda.hora ? `<div class="row"><span>Agendado</span><span>${esc(diaTxt(st.agenda.dia))}, ${st.agenda.hora}</span></div>` : "",
  ].join("");
  const resumo =
    `<div class="card-top">🔔 Resumo enviado para a equipe</div>` +
    `<div class="card-body">` +
    `<div class="row"><span>Prioridade</span><span>${motivo === "urgencia" ? "🔴 Alta" : "Normal"}</span></div>${extra}` +
    `<div class="small">Últimas mensagens do cliente:</div>${ultimos}</div>`;
  notaDepois("Isto é o que a equipe da empresa recebe no celular dela (o cliente não vê este resumo):");
  bot(resumo, { card: true });

  const s = sessao;
  fila = fila.then(async () => {
    await sleep(900);
    if (s !== sessao) return;
    addNota(`${neg.atendente} (equipe ${neg.nome}) entrou na conversa`);
    $("#biz-status").textContent = `${neg.atendente} está atendendo`;
  });
  bot(
    motivo === "urgencia"
      ? `Oi, aqui é ${neg.atendente}, da equipe! Já estou vendo o seu caso. Me conta rapidinho o que está acontecendo?`
      : `Oi! Aqui é ${neg.atendente}, da equipe. 😊 Vi o resumo aqui, como posso te ajudar?`,
    { autor: neg.atendente }
  );
  notaDepois("Fim da demonstração. Na versão real, a partir daqui quem responde é a pessoa da equipe, pelo mesmo WhatsApp.");
  chipsDepois(["Voltar ao assistente", "Recomeçar demonstração"]);
}

function respostaHumano(t) {
  if (has(t, ["recomecar"])) return iniciar(Object.keys(NEGOCIOS).find((k) => NEGOCIOS[k] === neg));
  if (has(t, ["voltar", "assistente", "robo", "bot"])) {
    st.humano = false;
    $("#biz-status").textContent = "online";
    addNota("O assistente virtual voltou à conversa");
    bot("Voltei! 🙂 Em que mais posso ajudar?");
    return chipsDepois(CHIPS_INICIO);
  }
  bot("Entendi! Vou resolver isso para você agora mesmo.", { autor: neg.atendente });
  notaDepois("Nesta demonstração a atendente é simulada. No seu negócio, aqui responde a sua equipe de verdade.");
  chipsDepois(["Voltar ao assistente", "Recomeçar demonstração"]);
}

// ---------- Ligações da página ----------
const ctaTexto = "Ola! Testei a demonstracao do atendente com IA no site da IAqui e quero algo assim no meu negocio.";
document.querySelectorAll("[data-cta]").forEach((a) => {
  a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(ctaTexto)}`;
});
document.querySelectorAll(".pick").forEach((b) => b.addEventListener("click", () => iniciar(b.dataset.biz)));
$("#restart").addEventListener("click", () => iniciar(Object.keys(NEGOCIOS).find((k) => NEGOCIOS[k] === neg)));

// Permite mandar o link já no ramo do lead: .../demo/?ramo=academia
const pedido = new URLSearchParams(location.search).get("ramo");
let inicial = NEGOCIOS[pedido] ? pedido : null;
if (!inicial) { try { inicial = localStorage.getItem("iaqui-demo-biz"); } catch (e) {} }
iniciar(NEGOCIOS[inicial] ? inicial : "clinica");
