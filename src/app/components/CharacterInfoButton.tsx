import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faClipboardList,
  faFileLines,
  faHatWizard,
  faFeatherPointed,
  faShieldAlt,
  faBookSkull,
  faAddressBook,
  faPersonRifle,
  faToolbox,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type CharacterInfoProps = {
  characterId: string;
};

export const CharacterInfo = ({ characterId }: CharacterInfoProps) => {
  const listButton = [
    {
      link: "/character/attributes/",
      icon: faClipboardUser,
      label: "Atributos",
    },
    {
      link: "/character/improvements/",
      icon: faClipboardList,
      label: "Aprimoramentos",
    },
    { link: "/character/skills/", icon: faFileLines, label: "Perícias" },
    {
      link: "/character/combat-skills/",
      icon: faShieldAlt,
      label: "Perícias de Combate",
    },
    { link: "/character/magic/", icon: faHatWizard, label: "Magias" },
    { link: "/character/rituais/", icon: faBookSkull, label: "Grimório" },
    { link: "/character/backgrounds/", icon: faPersonRifle, label: "Armas" },
    { link: "/character/backgrounds/", icon: faToolbox, label: "Equipamentos" },
    { link: "/character/info/", icon: faUserSecret, label: "Info" },
    { link: "/character/backgrounds/", icon: faAddressBook, label: "Contatos" },
    {
      link: "/character/backgrounds/",
      icon: faFeatherPointed,
      label: "Background",
    },
  ];

  return (
    <div className="w-100 d-flex gap-4 justify-content-around flex-wrap">
      {listButton.map((item) => (
        <Link
          href={`${item?.link}/${characterId}`}
          className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "45px",
            height: "45px",
          }}
          aria-label={item?.link}
          title={item?.link}
          key={`${item?.link}-${item?.label}`}
        >
          <FontAwesomeIcon icon={item?.icon} size="xl" />
        </Link>
      ))}
    </div>
  );
};
