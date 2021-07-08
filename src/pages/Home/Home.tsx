import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { chevronBackSharp, chevronForwardSharp } from 'ionicons/icons';
import { useContext, useRef } from 'react';
import ApplicationContext from '../../context/ApplicationContext';
import { Character } from '../../models/character.model';
import './Home.css';


const Home: React.FC = () => {
  
  const applicationContext = useContext(ApplicationContext);

  useIonViewDidEnter(() => {
    setTimeout(async () => {
      const result = await fetch('https://rickandmortyapi.com/api/character');
      const data = await result.json();
      const resultCharacters: Character[] = data.results;

      /**ACTUALIZANDO EL ESTADO */
      applicationContext.refreshCharacters(resultCharacters);
    }, 3000);
  });

  const prev = () => {

  }

  const next = () => {
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ionic App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {applicationContext.characters.length === 0 ? (
          <IonGrid>
            <IonRow>
              <IonCol className="ion-text-center">
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
                <IonCard>
                  <IonSkeletonText
                    animated
                    style={{ width: '100%', height: '300px' }}
                  />
                  <IonCardHeader>
                    <IonCardSubtitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardSubtitle>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: '100%' }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: '100%' }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid>
              <IonRow >
                <IonCol className="ion-text-center">
                  <IonButton color="light" onClick={prev}>
                    <IonIcon icon={chevronBackSharp}  />
                    Previous
                  </IonButton>
                  <IonButton color="light" onClick={next}>
                    <IonIcon slot="end" icon={chevronForwardSharp}  />
                    Next
                  </IonButton>
                {applicationContext.characters.map((item) => (
                  <IonCard key={item.id}>
                    <img src={item.image} alt="content-rym" />
                    <IonCardHeader>
                      <IonCardSubtitle>{item.species}</IonCardSubtitle>
                      <IonCardTitle>{item.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{item.status}</p>
                    </IonCardContent>
                  </IonCard>
                ))}
                </IonCol>
              </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
