import './Container.css'


export default function Container({ className, children }) {

    if (!className) {
        return <div className='container'>{children}</div>
    }

    let classes = 'container ' + className

    return (
        <div className={classes}>{children}</div>
    )
}