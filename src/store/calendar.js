import { writable } from 'svelte/store';
import { 
    getDay, 
    getMonth,
    getYear,
    format, 
    getDaysInMonth, 
    addMonths, 
    startOfMonth, 
    subMonths, 
    isToday,
    addDays,
    subDays,
    getDate,
    getDayOfYear,
    endOfMonth
} from 'date-fns'

const CalenderStore = () => {
    const viewData = {
        view: 'month',
        selected: {
            dateObj: '',
            formate: '',
            year: '',
            month:'',
            day: ''
        }
    }

    function formateSelectedDate(val) {
        return format(val, 'MMMM yyyy')
    }

    const { subscribe, update, set } =  writable(viewData)
    
    const methods = {

        init() {
            update(viewData => {
                viewData.selected.dateObj = new Date()
                viewData.selected.formate = formateSelectedDate(viewData.selected.dateObj)
                viewData.selected.year = getYear(viewData.selected.dateObj)
                viewData.selected.month = getMonth(viewData.selected.dateObj)
                viewData.selected.day = getDay(viewData.selected.dateObj)
                return viewData
            })
        }

    }

    return {
        set,
        update,
        subscribe,
        ...methods
    }
}

export default CalenderStore();