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
      currentContact: {
        name: "",
        avatar: "",
        messages: [
        ]
      },
      newMessage: ""
    }
  },
  methods: {
    openChat(contact) {
      this.currentContact = contact
    },
    sendMessage() {
      const newMessageObj = {
        date: "",
        message: this.capitalize(this.newMessage),
        status: "sent"
      }
      this.currentContact.messages.push(newMessageObj)

      this.newMessage = ""

      setTimeout(() => {
        const newDefaultMessageObj = {
          date: "",
          message: "Okay",
          status: "received"
        }

        this.currentContact.messages.push(newDefaultMessageObj)
      }, 1000)
    },
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
    }
  },
  beforeMount() {
    this.currentContact = this.contatti[0]
  }
}).mount('#app')