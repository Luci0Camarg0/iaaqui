// Número do WhatsApp com DDI e DDD, só dígitos. Ex.: 5517999999999
const WHATSAPP = "5517992693807";
const EMAIL = "luciocamargocandido@gmail.com";
const SAUDACAO = "Olá! Vim pelo site da IAqui e quero saber mais.";

const waUrl = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

document.querySelectorAll("[data-wa-link]").forEach((a) => {
  a.href = waUrl(SAUDACAO);
  a.target = "_blank";
  a.rel = "noopener";
});

document.getElementById("ano").textContent = new Date().getFullYear();

// Formulário: monta a mensagem e abre WhatsApp ou e-mail
const form = document.getElementById("lead-form");
const erro = document.getElementById("form-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const canal = e.submitter?.dataset.channel || "whatsapp";
  const d = Object.fromEntries(new FormData(form));
  if (!d.nome.trim()) {
    erro.hidden = false;
    form.nome.focus();
    return;
  }
  erro.hidden = true;

  const linhas = [
    `Olá! Meu nome é ${d.nome.trim()}${d.empresa.trim() ? `, da ${d.empresa.trim()}` : ""}.`,
    `Tenho interesse em: ${d.servico}.`,
  ];
  if (d.mensagem.trim()) linhas.push(d.mensagem.trim());
  linhas.push("Vim pelo site da IAqui.");
  const texto = linhas.join("\n");

  if (canal === "email") {
    const assunto = `Diagnóstico IAqui: ${d.empresa.trim() || d.nome.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`;
  } else {
    window.open(waUrl(texto), "_blank", "noopener");
  }
});

// Animação de entrada ao rolar
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
