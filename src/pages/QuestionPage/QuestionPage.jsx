import { useNavigate, useParams } from "react-router-dom";
import cls from "./QuestionPage.module.css";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useEffect, useId, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constants";
import { Loader, SmallLoader } from "../../components/Loader";

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const levelChoose = () => (card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert");
  const completedChoose = () => (card.completed ? "success" : "primary");

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setCard(data);
  });

  const [updateCard, isCardUpdating] = useFetch(async (newCompleted) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newCompleted }),
    });
    const updatedCard = await response.json();

    setCard(updatedCard); // ✅ update the main card state
    setIsChecked(updatedCard.completed); // optional, keeps checkbox in sync
  });

  useEffect(() => {
    fetchCard();
  }, []);

  //   useEffect(() => {
  //     if (card != null) setIsChecked(card.completed);
  //   }, [card?.id]); // only run once per card load

  const onCheckboxChangeHandler = () => {
    const newValue = !isChecked;
    setIsChecked(newValue); // update UI
    updateCard(newValue); // send PATCH
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge choose={levelChoose()}>Level: {card.level}</Badge>
            <Badge choose={completedChoose()}>{card.completed ? "Completed" : "Not Completed"}</Badge>

            {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
            Edit question
          </Button>
          <Button onClick={() => navigate(`/`)} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
