import style9 from 'style9'

const styles = style9.create({
    blue: {
        color: 'red',
        background: '#ff9'
    }
})

document.body.className = styles('blue')