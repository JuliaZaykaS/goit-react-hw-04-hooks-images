import s from './Button.module.css';

export default function Button({onClickBtn}) {
    return (
        <button type="button" className={s.Button} onClick={onClickBtn}>Load more</button>
    )
}