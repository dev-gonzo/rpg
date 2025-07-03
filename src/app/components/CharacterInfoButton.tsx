import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faClipboardList,
  faFileLines,
  faHatWizard,
  faFeatherPointed,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type CharacterInfoProps = {
  characterId: string;
};

export const CharacterInfo = ({ characterId }: CharacterInfoProps) => {
  return (
    <div className="w-100 d-flex gap-2 justify-content-between">
      <Link
        href={`/character/attributes/${characterId}`}
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "45px",
          height: "45px",
        }}
        aria-label="Atributos"
        title="Atributos"
      >
        <FontAwesomeIcon icon={faClipboardUser} size="xl" />
      </Link>

      <Link
        href={`/character/improvements/${characterId}`}
        className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "45px",
          height: "45px",
        }}
        aria-label="Aprimoramentos"
        title="Aprimoramentos"
      >
        <FontAwesomeIcon icon={faClipboardList} size="xl" />
      </Link>

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
