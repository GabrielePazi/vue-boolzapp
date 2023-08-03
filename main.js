"use strict"

const app = Vue.createApp({
  data() {
    return {
      contatti: [
        {
          name: "Michele",
          avatar: "_1",
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "received",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],
      answers: ["Okay", "Non oggi", "Io Sono IronMan", "Il mio nome è Bot, James Bot", "Fuggi sciocco"],
      currentContact: {
        name: "",
        avatar: "",
        messages: [
        ]
      },
      newMessage: "",
      searchedChat: "",
      chatStatus: ""
    }
  },
  methods: {
    openChat(contact) {
      this.currentContact = contact

      this.scrollBottom()

      this.chatStatus = "Ultimo accesso oggi alle " + this.formatDate(this.currentContact.messages[this.currentContact.messages.length - 1].date)
    },
    /**
     * Crea una data.
     * Controlla che il messaggio inserito non sia vuoto o composto da soli spazi.
     * Crea un nuovo oggetto Messaggio con la data attuale creata prima, il testo insserito e formattato, il tipo di messaggio e poi lo aggiunge al contatto corrente.
     * Resetta il valore del nuovo messaggio.
     * Modifica lo stato della chat.
     * Scrolla verso il basso per visualizzare il messaggio appena inviato.
     * Dopo 1 sec. invia una tra le risposte radnomiche preimpostate e fa un altro scroll per visualizzare il messaggio appena ricevuto.
     * Dopo 2 sec. modifica lo stato della chat
     * 
     */
    sendMessage() {
      const currentTime = new Date()

      if (this.newMessage !== "" && this.checkOnlySpaces(this.newMessage)) {
        const newMessageObj = {
          date: currentTime.toLocaleDateString() + " " + currentTime.toLocaleTimeString(),
          message: this.capitalize(this.newMessage),
          status: "sent"
        }
        this.currentContact.messages.push(newMessageObj)

        this.newMessage = ""
        this.chatStatus = "Sta scrivendo..."

        this.scrollBottom()
        setTimeout(() => {
          this.chatStatus = "Online"

          const currentTime = new Date()

          const newDefaultMessageObj = {
            date: currentTime.toLocaleDateString() + " " + currentTime.toLocaleTimeString(),
            message: this.randomAnswer(),
            status: "received"
          }
          this.currentContact.messages.push(newDefaultMessageObj)
          this.scrollBottom()
        }, 1000)

        setTimeout(() => {
          this.chatStatus = "Ultimo accesso oggi alle " + this.formatDate(this.currentContact.messages[this.currentContact.messages.length - 1].date)
        }, 2000);
      }
    },
    randomAnswer() {
      let rand = Math.floor(Math.random() * this.answers.length)

      return this.answers[rand]
    },
    /**
     * Converte una data in formato hh:mm
     * @param {*} date data in formato "dd/mm/yyyy hh:mm:ss"
     * @returns data convertita
     */
    formatDate(date) {
      date = date.split(' ')[1]

      date = date.split(':')[0] + ":" + date.split(':')[1]
      return date
    },
    /**
     * Converte una stringa in una stringa con la prima lettera Maiuscola
     * @param {*} string string da convertire
     * @returns string con maiuscola
     */
    capitalize(string) {
      let capitalizedString = ""

      for (let i = 0; i < string.length; i++) {
        if (i == 0) {
          capitalizedString += string[i].toUpperCase()
        } else {
          capitalizedString += string[i]
        }
      }

      return capitalizedString
    },
    /**
     * Cancella il messaggio il cui testo e indice vengono passati come primi due parametri 
     * 
     * @param {*} testoMess testo del messaggio da cancellare
     * @param {*} indexToDel indice del messaggio da cancellare
     */
    deleteMessage(testoMess, indexToDel) {
      for (let i = 0; i < this.currentContact.messages.length; i++) {
        if (this.currentContact.messages[i].message == testoMess && indexToDel == i) {
          this.currentContact.messages.splice(i, 1)
          break
        }
      }
    },
    checkOnlySpaces(str) {
      return !str.trim() == ""  //str.trim() restituisce la stringa senza spazi 
    },
    scrollBottom() {
      this.$nextTick(() => {
        this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
      })
    }
  },
  beforeMount() {
    this.currentContact = this.contatti[0]
  },
  mounted() {
    this.chatStatus = "Ultimo accesso oggi alle " + this.formatDate(this.currentContact.messages[this.currentContact.messages.length - 1].date)
  }
}).mount('#app')