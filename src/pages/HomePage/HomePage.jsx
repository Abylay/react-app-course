import { useState, useEffect, useMemo } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setsearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  };

  const cards = useMemo(() => {
    return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [questions, searchValue]);

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">conpleted DESC</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}

      <QuestionCardList cards={cards} />
    </>
  );
};
