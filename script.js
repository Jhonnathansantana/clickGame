
        /**
         * Objeto principal del juego que encapsula toda la lógica y el estado.
         * Este patrón se llama "Módulo" y ayuda a organizar el código y evitar variables globales.
         */
        const Game = {
            /**
             * Contiene todas las variables de configuración inicial del juego.
             * Estas variables no cambian durante una partida.
             */
            config: {
                initialLives: 3,
                initialBlockLifetime: 20000, // 20 segundos
                initialGenerationSpeed: 1500, // 1.5 segundos
                minBlockLifetime: 1000, // 1 segundo
                minGenerationSpeed: 400, // 0.4 segundos
                lifetimeReduction: 500, // 0.5 segundos
                speedReduction: 25, // 25 milisegundos
                HEART_SVG: `<svg class="heart" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 5.15041C10.4962 3.82234 8.42094 3.00004 6.25134 3.00004C2.79184 3.00004 0 5.79188 0 9.25138C0 13.4347 4.79184 17.5532 11.1035 20.6953C11.5975 20.9423 12.4045 20.9423 12.8985 20.6953C19.2082 17.5532 24 13.4347 24 9.25138C24 5.79188 21.2082 3.00004 17.7487 3.00004C15.5791 3.00004 13.5038 3.82234 12.001 5.15041Z"/></svg>`
            },

            /**
             * Contiene todas las variables que cambian durante el juego (el estado).
             */
            state: {
                score: 0,
                lives: 0,
                playerName: '',
                isPlaying: false,
                currentBlockLifetime: 0,
                currentGenerationSpeed: 0,
                gameLoopTimeout: null
            },

            /**
             * Almacena las referencias a los elementos del DOM para no tener que buscarlos repetidamente.
             */
            elements: {},

            /**
             * Método de inicialización. Se ejecuta una sola vez al cargar la página.
             * Su trabajo es preparar el juego, cachear elementos y asignar eventos.
             */
            init() {
                this.cacheDOMElements();
                this.bindEvents();
            },

            /**
             * Guarda las referencias a los elementos del DOM en el objeto `elements`.
             */
            cacheDOMElements() {
                this.elements.gameContainer = document.getElementById('game-container');
                this.elements.scoreDisplay = document.getElementById('score-display');
                this.elements.livesDisplay = document.getElementById('lives-display');
                this.elements.startModal = document.getElementById('start-modal');
                this.elements.gameOverModal = document.getElementById('game-over-modal');
                this.elements.playerNameInput = document.getElementById('player-name-input');
                this.elements.startButton = document.getElementById('start-button');
                this.elements.restartButton = document.getElementById('restart-button');
                this.elements.finalScoreText = document.getElementById('final-score');
            },

            /**
             * Asigna todas las funciones a los eventos del usuario (clics, teclas, etc.).
             */
            bindEvents() {
                this.elements.playerNameInput.addEventListener('keyup', () => {
                    this.elements.startButton.disabled = this.elements.playerNameInput.value.trim() === '';
                });

                this.elements.startButton.addEventListener('click', () => this.start());
                this.elements.restartButton.addEventListener('click', () => this.showStartScreen());
                this.elements.gameContainer.addEventListener('mousedown', (e) => this.handleBlockClick(e));
                this.elements.gameContainer.addEventListener('contextmenu', e => e.preventDefault());
            },

            /**
             * Inicia una nueva partida.
             */
            start() {
                // Resetea el estado del juego con los valores de configuración inicial.
                this.state.playerName = this.elements.playerNameInput.value.trim();
                this.state.score = 0;
                this.state.lives = this.config.initialLives;
                this.state.currentBlockLifetime = this.config.initialBlockLifetime;
                this.state.currentGenerationSpeed = this.config.initialGenerationSpeed;
                this.state.isPlaying = true;

                // Actualiza la interfaz y oculta los modales.
                this.updateUI();
                this.elements.startModal.classList.add('hidden');
                this.elements.gameOverModal.classList.add('hidden');
                
                // Inicia el bucle principal del juego.
                this.gameLoop();
            },

            /**
             * Bucle principal del juego. Usa setTimeout para llamarse a sí mismo recursivamente.
             * Esto es más estable que setInterval para juegos.
             */
            gameLoop() {
                if (!this.state.isPlaying) return;
                this.createBlock();
                this.state.gameLoopTimeout = setTimeout(() => this.gameLoop(), this.state.currentGenerationSpeed);
            },

            /**
             * Termina la partida actual.
             */
            gameOver() {
                if (!this.state.isPlaying) return;
                this.state.isPlaying = false;
                clearTimeout(this.state.gameLoopTimeout); // Detiene el bucle de juego.
                
                // Limpia la pantalla de bloques.
                this.elements.gameContainer.querySelectorAll('.block').forEach(block => block.remove());
                
                // Muestra la puntuación final y el modal de "Game Over".
                this.elements.finalScoreText.innerHTML = `<span style="color:#ffeb3b; font-size: 1.5rem;">${this.state.playerName}</span><br>Tu Puntuación: ${this.state.score}`;
                this.elements.gameOverModal.classList.remove('hidden');

                this.elements.restartButton.addEventListener('click', () => this.showStartScreen(), { once: true });
            },
            
            /**
             * Muestra la pantalla de inicio para permitir reiniciar la partida.
             */
            showStartScreen() {
                this.elements.gameOverModal.classList.add('hidden');
                this.elements.startModal.classList.remove('hidden');
                this.elements.playerNameInput.value = '';
                this.elements.startButton.disabled = true;
            },

            /**
             * Actualiza la puntuación y las vidas en la pantalla.
             */
            updateUI() {
                this.elements.scoreDisplay.textContent = `Score: ${this.state.score}`;
                this.elements.livesDisplay.innerHTML = '';
                for (let i = 0; i < this.state.lives; i++) {
                    this.elements.livesDisplay.innerHTML += this.config.HEART_SVG;
                }
            },

            /**
             * Resta una vida y actualiza la UI. Si las vidas llegan a cero, termina el juego.
             */
            loseLife() {
                if (!this.state.isPlaying) return;
                this.state.lives--;
                this.updateUI();
                if (this.state.lives <= 0) {
                    this.gameOver();
                }
            },

            /**
             * Aumenta la dificultad del juego reduciendo el tiempo de vida y la velocidad de generación.
             */
            increaseDifficulty() {
                this.state.currentBlockLifetime = Math.max(this.config.minBlockLifetime, this.state.currentBlockLifetime - this.config.lifetimeReduction);
                this.state.currentGenerationSpeed = Math.max(this.config.minGenerationSpeed, this.state.currentGenerationSpeed - this.config.speedReduction);
            },

            /**
             * Crea un nuevo bloque en una posición aleatoria.
             */
            createBlock() {
                const block = document.createElement('div');
                block.classList.add('block');
                
                const isLeftClick = Math.random() > 0.5;
                block.dataset.type = isLeftClick ? 'left' : 'right';
                block.classList.add(isLeftClick ? 'block-left' : 'block-right');

                const blockText = document.createElement('div');
                blockText.classList.add('block-text');
                blockText.textContent = isLeftClick ? 'Izquierdo' : 'Derecho';
                block.appendChild(blockText);

                const maxX = this.elements.gameContainer.clientWidth - 110;
                const maxY = this.elements.gameContainer.clientHeight - 90;
                block.style.left = `${Math.random() * maxX}px`;
                block.style.top = `${Math.random() * maxY}px`;

                const timerBar = document.createElement('div');
                timerBar.classList.add('timer-bar');
                block.appendChild(timerBar);

                this.elements.gameContainer.appendChild(block);
                
                requestAnimationFrame(() => {
                    timerBar.style.transitionDuration = `${this.state.currentBlockLifetime}ms`;
                    timerBar.style.width = '0%';
                });

                const blockTimeout = setTimeout(() => {
                    if (document.body.contains(block)) {
                        this.loseLife();
                        block.remove();
                    }
                }, this.state.currentBlockLifetime);

                block.dataset.timeoutId = blockTimeout.toString();
            },
            
            /**
             * Maneja el evento de clic en un bloque.
             */
            handleBlockClick(e) {
                if (!this.state.isPlaying) return;

                const block = e.target.closest('.block');
                if (!block) return;
                
                e.preventDefault();
                clearTimeout(parseInt(block.dataset.timeoutId));

                const blockType = block.dataset.type;
                const clickType = e.button === 0 ? 'left' : 'right';

                if (blockType === clickType) {
                    this.state.score++;
                    this.updateUI();
                    this.increaseDifficulty();
                } else {
                    this.loseLife();
                }
                
                block.remove();
            }
        };

        // Inicia el juego cuando el DOM esté listo.
        Game.init();