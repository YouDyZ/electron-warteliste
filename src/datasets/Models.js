const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Du benötigst einen Nutzernamen!'],
        unique: [true, 'Der Benutzername ist bereits vergeben'],
    },
    password: {
        type: String,
        required: [true, 'Du benötigst ein Passwort'],
    },
    salt: {
        type: String,
        required: [true, 'Fehler beim Salzen'],
    },
});
const Users = mongoose.model('Nutzer', UsersSchema);

const KurseSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, 'Du brauchst einen Tag'],
    },
    timeH: {
        type: Number,
        required: [true, 'Die Startstunde is noch Wichtig'],
        min: [7, 'Das ist zu früh'],
        max: [22, 'Das liegt außerhalb der Öffnungszeit'],
    },
    timeM: {
        type: Number,
        required: [true, 'Mann soll der Kurs Starten in Minuten'],
        min: [0, 'Die Stunde hat nur 0-59 Minuten'],
        max: [59, 'Die Stunde hat nur 0-59 Minuten'],
    },
    leader: {
        type: String,
        required: [true, 'jeder Kurs benötigt einen Kursleiter'],
    },
    members: {
        type: Array,
        default: [],
    },
    waiting: {
        type: Array,
        required: true,
        default: [],
    },
});

const Kurse = mongoose.model('Kurse', KurseSchema);

const MembersSchema = new mongoose.Schema({
    forName: {
        type: String,
        required: [true, 'Jeder benötigt einen Vornamen'],
    },
    lastName: {
        type: String,
        required: [true, 'Jeder benötigt einen Nachnamen'],
    },
    phone: {
        type: String,
        required: [true, 'Due benötigst noch eine Telefonnummer'],
    },
    street: {
        type: String,
        required: [true, 'Du brauchst eine Adresse'],
    },
    streetNumber: {
        type: Number,
        required: [true, 'Du brauchst eine Straßennummer.'],
    },
    courses: {
        type: Array,
        required: true,
        default: [],
    },
    waiting: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const Members = mongoose.model('Members', KurseSchema);

module.exports = {
    Users,
    Kurse,
    Members,
};
