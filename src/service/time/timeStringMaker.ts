const todayTimeTemplate = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
}

const notTodayTimeTemplate = {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
}

const messageTime = (
    time: number,
    timeTemplate: Intl.DateTimeFormatOptions
): string => {
    return new Date(time).toLocaleTimeString('en-GB', timeTemplate)
}

const dayText = (time: number): string => {
    if (
        [1, 30, 29].includes(
            Math.abs(
                Number(new Date().getDate()) - Number(new Date(time).getDate())
            )
        )
    ) {
        return 'yesterday'
    }
    if (Number(new Date().getDate()) - Number(new Date(time).getDate()) === 0) {
        return 'today'
    }
    return ''
}

export const makeTimeString = (time: number): string => {
    if (Number(new Date().getDate()) - Number(new Date(time).getDate()) === 0) {
        return `${dayText(time)} ${messageTime(
            time,
            todayTimeTemplate as Intl.DateTimeFormatOptions
        )}`
    }
    return `${dayText(time)} ${messageTime(
        time,
        notTodayTimeTemplate as Intl.DateTimeFormatOptions
    )}`
}
