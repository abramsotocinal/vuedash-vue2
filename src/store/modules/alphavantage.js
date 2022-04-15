import axios from "axios"

export default {
    state: {
        currData: null,
        cleanedData: null,
        chartHeaders: null,
        chartData: null,
        chartDataNoVolumeMcap: null,
        metaData: null,
    },
    mutations: {
        SET_DATA(state, data) {
            // using DIGITAL_CURRENCY_MONTHLY for testing
            let keys = Object.keys(data)
            data['DCM'] = data[keys[1]]
            data['META'] = data[keys[0]]
            delete data[keys[1]]
            delete data[keys[0]]
            state.currData = data
        },
        SET_CLEANED (state) {
            let cleanedData = []
            for ( let k in state.currData.DCM) {
                let newInnerObj = {} // temp placeholder for inner values
                for ( let i in state.currData.DCM[k]) {            
                    newInnerObj[i.split(" ")[1]] = parseFloat(parseFloat(state.currData.DCM[k][i]).toFixed(4)) // new key name : value pair

                }
                let newObj = { date: k, 
                    values: newInnerObj }
                cleanedData.push(newObj)
            }
            state.cleanedData = cleanedData
        },
        CLEAR_CLEANED (state) {
            // make sure it's cleared
            state.cleanedData = null
        },
        SET_CHART_HEADERS (state, chartHeaders) {
            state.chartHeaders = chartHeaders
        },
        SET_CHART_DATA (state, chartData) {
            state.chartData = chartData
        },
        SET_CHART_DATA_NO_MCAP(state, chartData) {
            state.chartDataNoVolumeMcap = chartData
        },
        SET_METADATA (state) {
            state.metaData = {
                info: state.currData['META']['1. Information'],
                currency_code: state.currData['META']['2. Digital Currency Code'],
                currency_name: state.currData['META']['3. Digital Currency Name'],
                market: state.currData['META']['4. Market Code'],
                last_refresh: state.currData['META']['6. Last Refreshed'],
                time_zone: state.currData['META']['9. Time Zone']
            }
        }
    },
    actions: {
        getData ({ commit }, url) {
            return axios.get(url).then(res => {
                commit('SET_DATA',res.data)
                commit('SET_METADATA')
                return res.status
            }).catch(err => {
                return err
            })
        },
        cleanData ({ commit, state }) {
            commit('CLEAR_CLEANED')
            commit('SET_CLEANED')
            if (state.cleanedData != null) {
                return true
            } else {
                return false
            }

        },
        convertToChartData ({ state, commit}, headersList) {
            let chartData = []
            let chartDataNoMcap = [] // exclude Volume and Market Cap
            let headers = []
            for (let i = 0; i < headersList.length; i++) {
                headers.push(headersList[i].text)
            }
            chartData.push(headers)

            // arrange values in a way that google charts interprets them as:
            // [low][open][close][high]
            for (let i = 0; i < state.cleanedData.length; i++) {
                let row = []
                row.push(state.cleanedData[i].date)
                row.push(state.cleanedData[i].values['low'])
                row.push(state.cleanedData[i].values['open'])
                row.push(state.cleanedData[i].values['close'])
                row.push(state.cleanedData[i].values['high'])

                chartData.push(row) // unchanged data
                chartDataNoMcap.push(row.slice(0,5)) // only include low,open,close,high columns; read more on google charts api
            }
            // reverse data order from earliest to latest(alphavantage api can do this probably?)
            chartDataNoMcap = chartDataNoMcap.reverse()

            chartDataNoMcap.unshift([headers[0],headers[3],headers[1],headers[4],headers[2]])
            commit('SET_CHART_DATA', chartData)
            commit('SET_CHART_DATA_NO_MCAP', chartDataNoMcap)
        },
    },
    getters: {
        currData (state) {
            return state.currData
        },
        cleanData (state) {
            return state.cleanedData
        },
        chartData (state) {
            return state.chartData
        },
        chartHeaders (state) {
            return state.chartHeaders
        },
        chartDataNoMcap (state) {
            return state.chartDataNoVolumeMcap
        },
        metaData (state) {
            return state.metaData
        }

    }
}