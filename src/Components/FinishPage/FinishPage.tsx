import styles from "./FinishPage.module.css";

function FinishPage(): JSX.Element {
  return (
    <article className={styles.FinishPage}>
      <h3>Заявка принята</h3>
      <p>Держите телефон под рукой. Скоро с Вами свяжется наш менеджер.</p>
    </article>
  );
}

export default FinishPage;
