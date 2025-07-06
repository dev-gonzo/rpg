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
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Fragment } from "react";

type CharacterInfoProps = {
  characterId: string;
};

export const CharacterInfo = ({ characterId }: CharacterInfoProps) => {
  const listButton = [
    { link: "/character/info/", icon: faUserSecret, label: "Dados Básicos" },
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
    { link: "/character/weapon/", icon: faPersonRifle, label: "Armas" },
    { link: "/character/equipment/", icon: faToolbox, label: "Equipamentos" },
    {
      link: "/character/relevant-person/",
      icon: faAddressBook,
      label: "Contatos",
    },
    {
      link: "/character/backgrounds/",
      icon: faFeatherPointed,
      label: "Background",
    },
    {
      link: "/character/notes/",
      icon: faFilePen,
      label: "Notas",
    },
  ];

  const chunkedButtons = [];
  for (let i = 0; i < listButton.length; i += 3) {
    chunkedButtons.push(listButton.slice(i, i + 3));
  }

  return (
    <div className="container">
      {chunkedButtons.map((group, groupIndex) => (
        <div className="row justify-content-center" key={groupIndex}>
          {group.map((item) => (
            <div key={item.label} className="col-4 text-center mb-3">
              <Link
                href={`${item.link}/${characterId}`}
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "45px", height: "45px" }}
                aria-label={item.label}
                title={item.label}
              >
                <FontAwesomeIcon icon={item.icon} size="xl" />
              </Link>
              <span
                style={{
                  fontSize: "9px",
                  display: "block",
                  marginTop: "0.25rem",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
