document.addEventListener('DOMContentLoaded', function() {
    // --- VARIÁVEIS DE ANIMAÇÃO DE CADASTRO (CADASTRO.HTML) ---
    const prestadorEscolha = document.getElementById('prestador-escolha');
    const prestadorFormDetalhe = document.getElementById('prestador-form');
    const prestadorCard = document.getElementById('prestador-card-completo');
    
    const clienteEscolha = document.getElementById('cliente-escolha');
    const clienteFormDetalhe = document.getElementById('cliente-form');
    const clienteCard = document.getElementById('cliente-card-completo');

    const prestadorColuna = prestadorCard ? prestadorCard.closest('.col-md-6') : null;
    const clienteColuna = clienteCard ? clienteCard.closest('.col-md-6') : null;
    const linhaCards = prestadorColuna ? prestadorColuna.closest('.row') : null; 

    // --- VARIÁVEIS DOS ELEMENTOS <FORM> REAIS (CADASTRO.HTML) ---
    const formPrestador = document.getElementById('form-prestador-real');
    const formCliente = document.getElementById('form-cliente-real');


    // Função auxiliar para gerenciar animações de clique (ocultar/mostrar)
    function animateAndShowForm(selectedChoice, selectedFormDetalhe, selectedCard, selectedColumn, otherColumn) {
        
        // 1. Inicia o fade-out do card de escolha
        selectedChoice.classList.add('hide');

        // 2. Espera a animação do card de escolha terminar
        selectedChoice.addEventListener('transitionend', function handler() {
            selectedChoice.style.display = 'none';
            selectedFormDetalhe.style.display = 'block';
            
            // Inicia o fade-in do formulário
            setTimeout(() => {
                selectedFormDetalhe.classList.add('show');
            }, 50);

            selectedCard.classList.add('form-visivel');
            
            // Centraliza a coluna ativa
            selectedColumn.classList.add('centralizar-coluna');
            if (linhaCards) {
                linhaCards.classList.add('justify-content-center');
            }

            // Inicia o fade-out e remoção da outra coluna
            if (otherColumn) {
                otherColumn.classList.add('hide-column');
                otherColumn.addEventListener('transitionend', function otherColumnHandler() {
                    otherColumn.style.display = 'none';
                    otherColumn.removeEventListener('transitionend', otherColumnHandler);
                });
            }

            selectedChoice.removeEventListener('transitionend', handler);
        });
    }

    // --- LÓGICA DO CLIQUE PARA MOSTRAR O FORMULÁRIO (CADASTRO.HTML) ---
    if (prestadorEscolha && prestadorColuna && clienteColuna) {
        prestadorEscolha.addEventListener('click', function() {
            animateAndShowForm(prestadorEscolha, prestadorFormDetalhe, prestadorCard, prestadorColuna, clienteColuna);
        });
    }

    if (clienteEscolha && clienteColuna && prestadorColuna) {
        clienteEscolha.addEventListener('click', function() {
            animateAndShowForm(clienteEscolha, clienteFormDetalhe, clienteCard, clienteColuna, prestadorColuna);
        });
    }

    // --- LÓGICA DE SUBMISSÃO (REDIRECIONAMENTO APÓS CADASTRO) ---

    // 1. Submissão do Prestador
    if (formPrestador) {
        formPrestador.addEventListener('submit', function(event) {
            event.preventDefault();

            var email = document.getElementById('email-prestador').value.trim();
            var senha = document.getElementById('senha-prestador').value.trim();
            var senhaRepita = document.getElementById('senha-prestador-repita').value.trim();
            var nome = document.getElementById('nome-prestador').value.trim();

            if (senha !== senhaRepita) {
                alert('As senhas não coincidem. Por favor, verifique.');
                return;
            }

            // Salva o usuário cadastrado no localStorage
            var usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados') || '{}');
            usuariosCadastrados[email] = { senha: senha, tipo: 'prestador', nome: nome };
            localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));

            window.location.href = 'login.html?cadastro=sucesso';
        });
    }

    // 2. Submissão do Cliente
    if (formCliente) {
        formCliente.addEventListener('submit', function(event) {
            event.preventDefault();

            var email = document.getElementById('email-cliente').value.trim();
            var senha = document.getElementById('senha-cliente').value.trim();
            var senhaRepita = document.getElementById('senha-cliente-repita').value.trim();
            var nome = document.getElementById('nome-cliente').value.trim();

            if (senha !== senhaRepita) {
                alert('As senhas não coincidem. Por favor, verifique.');
                return;
            }

            // Salva o usuário cadastrado no localStorage
            var usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados') || '{}');
            usuariosCadastrados[email] = { senha: senha, tipo: 'cliente', nome: nome };
            localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));

            window.location.href = 'login.html?cadastro=sucesso';
        });
    }
});