import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faClipboardList,
  faFileLines,
  faHatWizard,
  faFeatherPointed,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";

export const CharacterInfo = () => {
  return (
    <div className="w-100 d-flex gap-2 justify-content-between">
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Atributos"
        title="Atributos"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faClipboardUser} size="xl" />
      </button>
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Aprimoramentos"
        title="Aprimoramentos"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faClipboardList} size="xl" />
      </button>
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Perícias"
        title="Perícias"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faFileLines} size="xl" />
      </button>
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Perícias de Combate"
        title="Perícias de Combate"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faShieldAlt} size="xl" />
      </button>
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Magias"
        title="Magias"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faHatWizard} size="xl" />
      </button>
      <button
        type="button"
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        //    onClick={handleClick}
        aria-label="Magias"
        title="Magias"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <FontAwesomeIcon icon={faFeatherPointed} size="xl" />
      </button>
    </div>
  );
};
