let modal = {
  el: null,
  elClose: null,
  elShow: null,
  outClickClose: true,

  showModal() {
    this.el.classList.add("active");
  },
  hideModal() {
    this.el.classList.remove("active");
  },

  // Setar os elementos que fecham o modal
  setElClose(ref) {
    this.elClose = document.querySelectorAll(`[data-modal-close='${ref}']`);

    // Verifica se tem pelo menos um elemento para FECHAR o modal
    if (!this.elClose.length) {
      console.warn(
        `Adicione o data-modal-close="${ref}" a um elemento para fechar o modal`
      );
      return;
    }
    this.elClose.forEach((item) =>
      item.addEventListener("click", this.hideModal)
    );
  },

  // Setar os elementos que mostram o modal
  setElShow(ref) {
    this.elShow = document.querySelectorAll(`[data-modal-show='${ref}']`);

    // Verifica se tem pelo menos um elemento para ABRIR o modal
    if (!this.elShow.length) {
      console.warn(
        `Adicione o data-modal-show="${ref}" a um elemento para abrir o modal`
      );
      return;
    }
    this.elShow.forEach((item) =>
      item.addEventListener("click", this.showModal)
    );
  },

  // Setar(ou não) o clique fora do modal
  setOutClick(hasConfigOut) {
    this.outClickClose = hasConfigOut == undefined ? true : hasConfigOut;

    if (this.outClickClose == false) return;

    this.el.addEventListener("click", (e) => {
      if (e.currentTarget == e.target) this.hideModal();
    });
  },

  init(config) {
    if (typeof config != "object") {
      console.error(
        `O argumento de configuração deve ser um 'object' e não: '${typeof config}'`
      );
      return;
    }

    if (!config.hasOwnProperty("el")) {
      console.error(`O objeto de configuração deve possuir a propriedade 'el'`);
      return;
    } else {
      // Contando o número de referências de um modal
      let modalReferences = document.querySelectorAll(
        `[data-modal='${config.el}']`
      );

      // Adicionando apenas o primeiro elemento de referência ao el
      this.el = modalReferences[0];

      // Caso o object de configuração do modal (config) não tenha o 'el'
      if (!this.el) {
        console.error(
          `Adicione o data-modal="${config.el}" a um elemento para setar o modal`
        );
        return;
      }
      
      // Caso tenha mais de uma referência do modal 
      if (modalReferences.length > 1)
        console.warn(`Há duas referências do data-modal="${config.el}"`);
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    // Setando os elementos de abrir/fechar o modal
    this.setElClose(config.el);
    this.setElShow(config.el);

    // Setar(ou não) o clique fora do modal
    this.setOutClick(config.outClickClose);
  },
};

// Tempo ativo
modal.init({ el: "modal-2" });
