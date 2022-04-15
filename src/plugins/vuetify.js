import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
// eslint-disable-next-line
import { v2 as darkv2 } from './themes/dark'

Vue.use(Vuetify);

// export default new Vuetify({
// });

// eslint-disable-next-line
const darkTheme1 = {
    primary: colors.blue.darken4,
    background: colors.indigo.base,
    info: colors.teal.lighten1,
}

export default new Vuetify({
theme: {
    dark: true,
    themes:{
        light: {
            primary: colors.lightBlue,
            secondary: colors.grey.darken1,
            accent: colors.pink.darken1,
            error: colors.red.accent3,
            background: colors.indigo.lighten5,
            info: colors.teal.darken1,
        },
        dark: darkv2
    }
}
})