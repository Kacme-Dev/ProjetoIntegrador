// --- PÁGINA HOME (index.html) ---

document.addEventListener('DOMContentLoaded', function() 
{
    // 1. Array de frases para o placeholder
    const frasesPlaceholder = [
        // Saúde
    "Agende sua consulta médica aqui.",
    "Encontre o especialista de saúde ideal.",
    "Busque clínicas e exames disponíveis.",
    
    // Beleza
    "Descubra salões e serviços de beleza.",
    "Procure por manicure, cabelo ou estética.",
    "Confira as últimas tendências em beleza.",

    // Manutenção Predial
    "Precisa de um eletricista ou encanador?",
    "Orçamento rápido para reformas e reparos.",
    "Serviços de manutenção predial e civil.",

    // TI (Tecnologia da Informação)
    "Soluções em software e desenvolvimento.",
    "Apoio técnico para problemas de TI.",
    "Busque por cibersegurança e infraestrutura.",

    // Lazer
    "Sugestões de passeios e entretenimento.",
    "Onde se divertir neste fim de semana?",
    "Encontre eventos, shows e atividades.",

    // Alimentação
    "Descubra restaurantes e deliverys.",
    "Cardápios, pratos e culinárias diversas.",
    "Onde comer hoje? Pesquise aqui!",
    
    // Design
    "Crie sua marca com designers profissionais.",
    "Serviços de design gráfico e web.",
    "Precisa de um novo layout ou identidade visual?",

    // Segurança
    "Contrate serviços de vigilância e alarmes.",
    "Busque soluções de segurança patrimonial.",
    "Segurança eletrônica e monitoramento.",

    // Logística
    "Encontre transportadoras e fretes.",
    "Soluções logísticas e de armazenamento.",
    "Cotação de transporte de cargas.",

    // Consultoria
    "Busque consultoria empresarial e financeira.",
    "Profissionais para orientar seu negócio.",
    "Consultoria jurídica, marketing e mais."
    ];    

    // 2. Seleciona o elemento de busca pelo ID
    const campoBusca = document.getElementById('campoBusca');

    if (campoBusca) {
        // 3. Função para obter uma frase randômica
        function obterFraseRandomica() {
            // Calcula um índice aleatório dentro do tamanho do array
            const indiceRandomico = Math.floor(Math.random() * frasesPlaceholder.length);
            return frasesPlaceholder[indiceRandomico];
        }

        // 4. Aplica a frase randômica ao placeholder no carregamento da página
        campoBusca.placeholder = obterFraseRandomica();
        
        // --- DICA ADICIONAL: Implementação da mudança automática (opcional) ---
        
        
        setInterval(function() {
            campoBusca.placeholder = obterFraseRandomica();
        }, 3000); 
        
    }
});

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
            window.location.href = 'login.html?cadastro=sucesso';
        });
    }

    // 2. Submissão do Cliente
    if (formCliente) {
        formCliente.addEventListener('submit', function(event) {
            event.preventDefault();
            window.location.href = 'login.html?cadastro=sucesso';
        });
    }
});


 document.addEventListener('DOMContentLoaded', function() {
            // --- LÓGICA DE EXIBIÇÃO DO ALERTA DE CADASTRO SUCESSO ---
            const urlParams = new URLSearchParams(window.location.search);
            const alertaContainer = document.getElementById('alerta-cadastro-sucesso');

            if (urlParams.get('cadastro') === 'sucesso' && alertaContainer) {
                const alertaHTML = `
                    <div class="alert alert-success alert-dismissible fade show text-center" role="alert">
                        <strong>Parabéns!</strong> Seu cadastro foi concluído. Faça login abaixo para começar!
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                alertaContainer.innerHTML = alertaHTML;
                history.replaceState(null, '', window.location.pathname);
            }

            // --- LÓGICA DE VALIDAÇÃO DE LOGIN ---
            const usuariosValidos = {
                "prestador@servgo.com": "senha123", // Perfil padrão
                "cliente@servgo.com": "senha456",  // Perfil padrão
                "admin@servgo.com": "admin"        // Dashboard/Admin
            };

            const formLogin = document.getElementById('form-login');
            const emailInput = document.getElementById('email-login');
            const senhaInput = document.getElementById('senha-login');
            const alertaErroContainer = document.getElementById('alerta-login-erro');

            if (formLogin) {
                formLogin.addEventListener('submit', function(event) {
                    event.preventDefault();

                    const email = emailInput.value.trim();
                    const senha = senhaInput.value.trim();
                    alertaErroContainer.innerHTML = ''; // Limpa erros anteriores
                    
                    if (usuariosValidos[email] && usuariosValidos[email] === senha) {
                        // LOGIN BEM-SUCEDIDO
                        if (email === "admin@servgo.com") {
                        // Redireciona para o painel administrativo
                        window.location.href = 'dashboard.html'; 
                    } else if (email === "cliente@servgo.com") {
                        // Redireciona para a nova página de Cliente
                        window.location.href = 'perfil_cliente.html'; 
                    } else {
                        // Redireciona o Prestador para a página genérica de perfil (perfil.html)
                        window.location.href = 'hotsiteADM.html'; 
                    }
                    } else {
                        // LOGIN COM FALHA
                        const erroHTML = `
                            <div class="alert alert-danger fade show text-center" role="alert">
                                E-mail e/ou senha incorretos. Tente novamente.
                            </div>
                        `;
                        alertaErroContainer.innerHTML = erroHTML;
                        senhaInput.value = ''; // Limpa o campo de senha
                    }
                });
            }
        });