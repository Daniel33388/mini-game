var app = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],  // The values obtained with each attack will be added to it.
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            // Calculate Player Damage.
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `The Player hits Monster for ${damage}`,
            });

            if (this.checkWinner()) {
                return;  // Finish the program.
            }
            // Calculate Monster Damage.
            this.monsterAttacks();
        },
        specialAttack: function() {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `The Player hits hard to Monster for ${damage}`,
            })

            if (this.checkWinner()) {
                return;
            }
            this.monsterAttacks()
        
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: `The Player heals for 10`,
            })
            this.monsterAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);  // Return the max between random and the param min.
        },
        checkWinner: function() {
            if (this.playerHealth <= 0) {
                if (confirm('You Lost!! Play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.monsterHealth <= 0) {
                if (confirm('You Won!! Play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttacks: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWinner();
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`,
            });
        }
    }
});