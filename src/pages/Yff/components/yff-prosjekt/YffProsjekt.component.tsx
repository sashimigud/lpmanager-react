import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import './yffProsjekt.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IProject } from '../../../../_models/prosjekt';

interface IYffProjectProps {
  initialProject: IProject;
  projects: IProject[] | [];
  removeProject: (projectNr: number | string) => void;
}

const YffProsjekt: FC<IYffProjectProps> = ({
  initialProject,
  projects,
  removeProject,
}: IYffProjectProps) => {
  const [initProject, setInitProject] = useState(initialProject);
  const [allProjects, setAllProjects] = useState(projects);

  const faIconTrash = faTrashAlt as IconProp;

  useEffect(() => {
    setInitProject(initialProject);
  }, [initialProject]);

  return (
    <div>
      <div className="project">
        <label className="input-label">
          Prosjektnummer:
          <input
            className="godkjenn-input"
            type="text"
            defaultValue={initProject.projectNr || ''}
            onInput={(event: ChangeEvent<HTMLInputElement>) =>
              setInitProject({
                ...initProject,
                projectNr: event.target.value,
              })
            }
          />
        </label>
        <label className="input-label">
          Lærefag Vg3:
          <input
            className="godkjenn-input"
            type="text"
            defaultValue={initProject.specialization || ''}
            onInput={(event: ChangeEvent<HTMLInputElement>) =>
              setInitProject({
                ...initProject,
                specialization: event.target.value,
              })
            }
          />
        </label>
        <label className="input-label">
          Organisering/Læringsarena:
          <input
            className="godkjenn-input"
            type="text"
            defaultValue={initProject.arena || ''}
            onInput={(event: ChangeEvent<HTMLInputElement>) =>
              setInitProject({
                ...initProject,
                arena: event.target.value,
              })
            }
          />
        </label>
        <label className="input-label">
          Årstimer:
          <input
            className="godkjenn-input"
            type="text"
            defaultValue={initProject.yearlyHours || ''}
            onInput={(event: ChangeEvent<HTMLInputElement>) =>
              setInitProject({
                ...initProject,
                yearlyHours: event.target.value,
              })
            }
          />
        </label>
      </div>
      {projects.map((project: IProject, index: number) => (
        <div className="project" key={project.projectNr}>
          <div
            className="delete-btn"
            onClick={() => removeProject(project.projectNr)}>
            <FontAwesomeIcon icon={faIconTrash} />
          </div>
          <label className="input-label">
            Prosjektnummer:
            <input
              className="godkjenn-input"
              type="text"
              defaultValue={''}
              onChange={(event) =>
                setAllProjects([
                  ...allProjects,
                  (allProjects[index] = {
                    ...allProjects[index],
                    projectNr: event.target.value,
                  }),
                ])
              }
            />
          </label>
          <label className="input-label">
            Lærefag Vg3:
            <input className="godkjenn-input" type="text" defaultValue={''} />
          </label>
          <label className="input-label">
            Organisering/Læringsarena:
            <input className="godkjenn-input" type="text" defaultValue={''} />
          </label>
          <label className="input-label">
            Årstimer:
            <input className="godkjenn-input" type="text" defaultValue={''} />
          </label>
        </div>
      ))}
    </div>
  );
};

export default YffProsjekt;
