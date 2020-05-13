<div class="small-calendar">
    <div class="c-flex s-calendar-month-directions">
        <div class="s-cal-month-year">
            <span>{calendarData.selectedMonth.formated}</span>
        </div>
        <div class="s-cal-nxt-prv-actions">
            <span class="s-cal-single-actions" on:click={ getPrevMonth }>
                <ChevronLeft />
            </span>        
            <span on:click={ getNextMonth } class="s-cal-single-actions">
                <ChevronRight />
            </span>
        </div>
    </div>

    <div class="c-flex s-calendar-header">
        <div class="weekdays-container-holder">
            {#each weekdays as weekday, i}
                <div class="item" >{ weekday[0] }</div>
            {/each}
        </div>
    </div>

    <div class="c-flex s-calendar-days-holder">
        <div class="days-container-holder">
            {#each calendarData.singleDays as singleDay, i}
                <div class="item item-days { singleDay.isActiveDay ? 'active-month' : '' } { singleDay.isToday ? 'active-day' : ''  }" >{ singleDay.dateFormate }</div>

                {#if ((i + 1) % 7 == 0)}
                    <div class="break"></div>
                {/if}
            {/each}
        </div>
    </div>
</div>

<script>
    import { 
        getDay, 
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
    import locale from 'date-fns/esm/locale/en-US'
    import ChevronLeft from "svelte-material-icons/ChevronLeft.svelte";
    import ChevronRight from "svelte-material-icons/ChevronRight.svelte";
    
    const weekdays = [...Array(7).keys()].map(i => locale.localize.day(i, { width: 'abbreviated' }))

    var singleDataObj = function(obj) {
        return {
            date: obj.date || '',
            dateFormate: obj.dateFormate || '',

            dayInMonth: obj.dayInMonth || 0,
            dayInWeek: obj.dayInWeek || 0,
            dayInYear: obj.dayInYear || 0,

            isToday: obj.isToday || false,
            isActiveDay: obj.isActiveDay || false
        }   
    }
    
    let calendarData = {
        today: {
            dateObj: new Date(),
            format: ''
        },
        selectedMonth: {
            dateObj: new Date(),
            formated: ''
        },
        calendarHeader: weekdays,
        totalNumberOfDaysInSelectedMonth: 0,
        totalBoxesToBeCreated: 42,
        singleDays: []
    }

    function renderCalenderObj() {
        calendarData.totalNumberOfDaysInSelectedMonth = getDaysInMonth(calendarData.selectedMonth.dateObj)
        calendarData.selectedMonth.formated = format(calendarData.selectedMonth.dateObj, 'MMMM yyyy')
        calendarData.singleDays = []

        var count = 1
        var EndStartMonthCount = 0
        var currentWeekDayNo = getDay(calendarData.selectedMonth.dateObj)
        var getStartOfCurrentMonth  = startOfMonth(calendarData.selectedMonth.dateObj)
        var getMonthStartWeekDayNo = getDay(getStartOfCurrentMonth)

        for(var i = 0; i < calendarData.totalBoxesToBeCreated; i++ ) { 

            var dayObj = new singleDataObj({})
            if(i >= getMonthStartWeekDayNo && count <= calendarData.totalNumberOfDaysInSelectedMonth) {
                dayObj.dateFormate = count
                dayObj.date = addDays(getStartOfCurrentMonth, count - 1)  

                dayObj.dayInMonth = getDate(dayObj.date)
                dayObj.dayInWeek = getDay(dayObj.date)   
                dayObj.dayInYear = getDayOfYear(dayObj.date)

                dayObj.isToday = isToday(dayObj.date)
                dayObj.isActiveDay = true
                count = count + 1 
            } else {
                if(i <= getMonthStartWeekDayNo) {
                    var prevMonthEndDay = endOfMonth(subMonths(getStartOfCurrentMonth, 1))
                    dayObj.date = subDays(prevMonthEndDay, getMonthStartWeekDayNo - (i + 1))  
                    dayObj.dateFormate = format(dayObj.date, 'd')

                    dayObj.dayInMonth = getDate(dayObj.date)
                    dayObj.dayInWeek = getDay(dayObj.date)   
                    dayObj.dayInYear = getDayOfYear(dayObj.date)

                    dayObj.isToday = isToday(dayObj.date)
                } else {
                    var nextMonthStartDay = startOfMonth(addMonths(getStartOfCurrentMonth, 1))
                    dayObj.date = addDays(nextMonthStartDay, EndStartMonthCount)  
                    dayObj.dateFormate = format(dayObj.date, 'd')

                    dayObj.dayInMonth = getDate(dayObj.date)
                    dayObj.dayInWeek = getDay(dayObj.date)   
                    dayObj.dayInYear = getDayOfYear(dayObj.date)

                    dayObj.isToday = isToday(dayObj.date)
                    EndStartMonthCount = EndStartMonthCount + 1
                }
            }

            calendarData.singleDays.push(dayObj)
        }
    }

    function getPrevMonth( action ) {
        var getStartOfCurrentMonth  = startOfMonth(calendarData.selectedMonth.dateObj)
        calendarData.selectedMonth.dateObj = subMonths(getStartOfCurrentMonth, 1)

        renderCalenderObj()
    }

    function getNextMonth() {
        var getStartOfCurrentMonth  = startOfMonth(calendarData.selectedMonth.dateObj)
        calendarData.selectedMonth.dateObj = addMonths(getStartOfCurrentMonth, 1)

        renderCalenderObj()
    }

    renderCalenderObj()

</script>

<style>
    .small-calendar {
        padding: 16px
    }

    .days-container-holder, .weekdays-container-holder {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
    }

    .item {
        display: flex;
        flex: 0 0 14.28%;
        justify-content: center;
        font-size: 10px;
        height: 29px;
        padding: 7px;
        color: #70757a;
    }

    .item-days {
        border-radius: 50%;
        cursor: pointer;
    }

    .item-days:hover {
        background-color: #f6f6f6;
    }

    .item-days.active-month {
        font-weight: 500;
        color: #3c4043;
    }

    .item-days.active-day {
        background-color: #1a73e8;
        color: #fff;
    }

    .break {
        flex-basis: 100%;
        height: 0;
    }

    .s-calendar-month-directions {
        justify-content: space-between;
    }

    .s-calendar-month-directions .s-cal-month-year {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: .25px;
        line-height: 20px;
        color: #3c4043;
        padding: 4px;
        padding-left: 8px;
    }

    .s-calendar-month-directions .s-cal-nxt-prv-actions {
        display: block;
        overflow: hidden;
    }

    .s-calendar-month-directions .s-cal-nxt-prv-actions .s-cal-single-actions {
        width: 29px;
        height: 29px;
        display: block;
        text-align: center;
        color: #3c4043;
        border-radius: 50%;
        cursor: pointer;
        outline: 0;
        float: left;
        font-size: 17px;
    }

    .s-calendar-month-directions .s-cal-nxt-prv-actions .s-cal-single-actions:hover {
        background-color: #f6f6f6;
    }
</style>