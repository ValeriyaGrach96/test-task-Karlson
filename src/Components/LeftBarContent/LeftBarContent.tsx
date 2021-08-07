import Form from '../Form/Form';
import './LeftBarContent.css';

function LeftBarContent() :JSX.Element {
  return (
    <div className="LeftBarContent">
      <p>Введите ваш номер <br/> мобильного телефона</p>
      <Form />
    </div>
  );
}

export default LeftBarContent;