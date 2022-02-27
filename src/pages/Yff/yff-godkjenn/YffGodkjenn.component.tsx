import React, { useState, ChangeEvent } from 'react';
import './yffGodkjenn.styles.scss';
import { useStore } from '../../../store/globalStore';
import CustomButton from '../../../components/customButton/CustomButton.component';
import LpmList from '../../../components/lpm-list/LpmList.component';
import { IProject } from '../../../_models/prosjekt';
import YffProsjekt from '../components/yff-prosjekt/YffProsjekt.component';

const YFFGodkjenn = () => {
  const { state } = useStore();

  const [studentInfo, setStudenInfo] = useState({
    firstName: state.valgtElev.Fornavn,
    lastName: state.valgtElev.Etternavn,
    schoolClass: state.valgtElev.Klasse,
    schoolYear: state.valgtElev.Skoleår,
    teacher: state.valgtElev.Faglærer,
    school: 'Tertnes Videregående skole',
    educationProgram: 'Salg, service og sikkerhet',
    printDate: '08/2020',
  });

  const [projects, setProjects] = useState<IProject[] | []>([]);
  const [editLpms, setEditLpms] = useState<boolean>(false);
  const [initialProject] = useState<IProject>({
    projectNr: 1,
    specialization: 'Service',
    arena: 'skolen',
    yearlyHours: '256',
  });

  const onRemoveProject = (projectNr: number | string) => {
    setProjects(projects.filter((project) => project.projectNr !== projectNr));
  };

  const onAddProject = () => {
    let project = {
      projectNr: projects.length + 2,
      specialization: '',
      arena: '',
      yearlyHours: '',
    };
    setProjects([...projects, project]);
  };

  return (
    <div className="godkjenn-container">
      <h1 className="godkjenn-title">YFF - Godkjenn</h1>
      <div className="input-container">
        <form>
          <div className="input-grp">
            <label className="input-label">
              Fornavn:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.firstName || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    firstName: event.target.value,
                  })
                }
              />
            </label>
            <label className="input-label">
              Etternavn:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.lastName || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    lastName: event.target.value,
                  })
                }
              />
            </label>
          </div>
          <div className="input-grp">
            <label className="input-label">
              Klasse:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.schoolClass || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    schoolClass: event.target.value,
                  })
                }
              />
            </label>
            <label className="input-label">
              Skoleår:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.schoolYear || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    schoolYear: event.target.value,
                  })
                }
              />
            </label>
          </div>
          <div className="input-grp">
            <label className="input-label">
              Faglærer:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.teacher || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({ ...studentInfo, teacher: event.target.value })
                }
              />
            </label>
            <label className="input-label">
              Skole:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.school || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({ ...studentInfo, school: event.target.value })
                }
              />
            </label>
          </div>
          <div className="input-grp">
            <label className="input-label">
              Utdanningsprogram:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.educationProgram || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    educationProgram: event.target.value,
                  })
                }
              />
            </label>
            <label className="input-label">
              Utskriftsdato:
              <input
                className="godkjenn-input"
                type="text"
                defaultValue={studentInfo.printDate || ''}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setStudenInfo({
                    ...studentInfo,
                    printDate: event.target.value,
                  })
                }
              />
            </label>
          </div>
        </form>
      </div>
      <div className="projects-container">
        <h3>Prosjekter: </h3>
        <YffProsjekt
          projects={projects}
          removeProject={onRemoveProject}
          initialProject={initialProject}
        />
      </div>
      <CustomButton text="Legg til prosjekt" onClick={() => onAddProject()} />
      <div className="chosenLPM-container">
        <h3>Valgte læreplanmål: </h3>
        {state.valgteLPM.map((lpm) => (
          <div className="lpm">{lpm.tittel}</div>
        ))}
      </div>
      <div className="edit-header-container">
        <hr />
        <h3 className="edit-header" onClick={() => setEditLpms(!editLpms)}>
          Trykk her for å redigere valgte læreplanmål
        </h3>
        <hr />
      </div>
      {editLpms ? (
        <div className="addLpm-container">
          <h3>Rediger valgte læreplanmål:</h3>
          <LpmList />
        </div>
      ) : null}
      <CustomButton text="Print" onClick={() => console.log('print')} />
    </div>
  );
};

export default YFFGodkjenn;
