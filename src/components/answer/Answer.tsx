import styles from "./Answer.module.css";
interface AnswerProps {
  id: string;
  descriptionValue: string;
  radioChecked: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Answer({
  id,
  descriptionValue,
  radioChecked,
  handleInputChange,
  handleCheckboxChange,
}: AnswerProps) {
  return (
    <div className={styles.contentAnswer}>
      <input
        id={id}
        className={styles.answer}
        type="text"
        name="description"
        placeholder="Enter your choice"
        value={descriptionValue}
        onChange={handleInputChange}
      />
      <div className={styles.answerRight}>
        <label>Right answer</label>
        <input
          id={id}
          type="checkbox"
          name="isCorrect"
          checked={radioChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
