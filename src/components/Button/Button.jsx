import cls from "./Button.module.css";

const isPrimary = true;

export const Button = (props) => {
  console.log(props);
  return (
    // <button className={isPrimary ? cls.primary : cls.btn}>Button</button>
    <button className={`${cls.btn} ${isPrimary ? cls.primary : ""}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
