import './RightBarContent.css';
import CloseSvg from '../../assets/icons/iconClose.svg';
import QRcode from '../../assets/images/QRcode.svg';

function RightBarContent() :JSX.Element {
  return (
    <div className="RightBarContent">
      <button aria-label="закрыть окно" className="CloseButton">
        <img src={CloseSvg} alt="крестик" />
      </button>
      <article className="QRcode">
        <p>Сканируйте QR-код для получения дополнительной информации</p>
        <img src={QRcode} alt="QRкод" />
      </article>
    </div>
  );
}

export default RightBarContent;