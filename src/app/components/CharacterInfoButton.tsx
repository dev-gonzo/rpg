import {
  faAddressBook,
  faBookSkull,
  faClipboardList,
  faClipboardUser,
  faFeatherPointed,
  faFileLines,
  faFilePen,
  faHatWizard,
  faPersonRifle,
  faShieldAlt,
  faToolbox,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Fragment } from "react";

type CharacterInfoProps = {
  characterId: string;
  isPermission: boolean;
  isControl: boolean;
  isMaster: boolean;
};

export const CharacterInfo = ({
  characterId,
  isControl,
}: CharacterInfoProps) => {
  const listButton = [
    { link: "/character/info/", icon: faUserSecret, label: "Dados Básicos" },
    {
      link: "/character/attributes/",
      icon: faClipboardUser,
      onlyControl: false,
      label: "Atributos",
    },
    {
      link: "/character/improvements/",
      icon: faClipboardList,
      onlyControl: false,
      label: "Aprimoramentos",
    },
    {
      onlyControl: false,
      link: "/character/skills/",
      icon: faFileLines,
      label: "Perícias",
    },
    {
      link: "/character/combat-skills/",
      icon: faShieldAlt,
      onlyControl: false,
      label: "Perícias de Combate",
    },
    {
      onlyControl: false,
      link: "/character/magic/",
      icon: faHatWizard,
      label: "Magias",
    },
    {
      onlyControl: false,
      link: "/character/rituais/",
      icon: faBookSkull,
      label: "Rituais e Poderes",
    },
    {
      onlyControl: false,
      link: "/character/weapon/",
      icon: faPersonRifle,
      label: "Armas",
    },
    {
      onlyControl: false,
      link: "/character/equipment/",
      icon: faToolbox,
      label: "Equipamentos",
    },
    {
      link: "/character/relevant-person/",
      icon: faAddressBook,
      onlyControl: false,
      label: "Contatos",
    },
    {
      link: "/character/backgrounds/",
      icon: faFeatherPointed,
      onlyControl: false,
      label: "Background",
    },
    {
      link: "/character/notes/",
      icon: faFilePen,
      onlyControl: true,
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
            <Fragment key={item.label}>
              {(!item.onlyControl || isControl) && (
                <div className="col-4 text-center mb-3">
                  <Link
                    href={{
                      pathname: `${item.link}/${characterId}`,
                      query: { isControl: isControl },
                    }}
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
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
