import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../models/user.model';
import { SignUp } from '../../services/AuthenticationService';

import './Register.css';
const Register: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [showValidations, setShowValdations] = useState<boolean>(false);
  const [localFirstName, setFirstName] = useState<any>({
    firstName: '',
  });
  const [localLastName, setLastName] = useState<any>({
    lastName: '',
  });
  const [localPassword, setPassword] = useState<any>({
    password: '',
  });
  

  const refFirstName = useRef<HTMLIonInputElement>(null);
  const refLastName = useRef<HTMLIonInputElement>(null);
  const refEmail = useRef<HTMLIonInputElement>(null);
  const refPassword = useRef<HTMLIonInputElement>(null);


  const handleOnChange = (e: any) => {
     const value: string = e.target.value;
     
      setFirstName({firstName: value})
        if(value.length < 5){
          setShowValdations(true);
        }
     
  }

  const OnChangeLastName = (ev: any) => {
    const value: string = ev.target.value;
    setLastName({lastName: value})
        if(value.length < 5){
          setShowValdations(true);
        } 
  }

  const OnChangePassword = (ev: any) => {
    const value: string = ev.target.value;
    setPassword({password: value})
        if(value.length < 5){
          setShowValdations(true);
        }  
  }

  const handleClickSignUp = async () => {
    const firstName = refFirstName.current?.value as string;
    const lastName = refLastName.current?.value as string;
    const email = refEmail.current?.value as string;
    const password = refPassword.current?.value as string;

    if (firstName && lastName && email && password) {
      const userToRegister: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };

      const resultSignUp = await SignUp(userToRegister);
      if (resultSignUp.userExists) {
        setMessage(resultSignUp.message);
        console.log(resultSignUp);
      } else {
        if (resultSignUp.data) {
          setShowAlert(true);
          console.log(resultSignUp);
        }
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton routerLink="/login" routerDirection="back">
              <IonIcon icon={chevronBackSharp} />
              Regresar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <br />
        <figure>
          <img
            src="https://ionicframework.com/blog/wp-content/uploads/2019/02/ionic-vs-react-native.png"
            alt="logo-app"
          />
        </figure>
        <IonItem lines="none" className="ion-item-register">
          <IonInput 
            type="text" 
            placeholder="Nombres" 
            ref={refFirstName} 
            value={localFirstName.firstName}
            onIonChange={handleOnChange}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput 
            type="text" 
            placeholder="Apellidos" 
            ref={refLastName} 
            value={localLastName.lastName}
            onIonChange={OnChangeLastName}
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="email"
            placeholder="Correo Electronico"
            ref={refEmail}
            required
          />
        </IonItem>
        <IonItem lines="none" className="ion-item-register">
          <IonInput
            type="password"
            placeholder="Contraseña"
            ref={refPassword}
            value={localPassword.password}
            onIonChange={OnChangePassword}
          />
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          header="Felicidades"
          message="La cuenta se registro correctamente."
          buttons={[
            {
              text: 'OK',
              handler: () => {
                history.push('/login');
              },
            },
          ]}
        />
        <IonToast
          isOpen={showValidations}
          onDidDismiss={() => setShowValdations(false)}
          message="Debes ingresar mas de 6 caracteres"
          duration={3000}
        />
        <IonToast
          isOpen={message !== undefined}
          onDidDismiss={() => setMessage(undefined)}
          message={message}
          duration={3000}
        />
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          size="large"
          expand="block"
          fill="solid"
          onClick={handleClickSignUp}
        >
          Registrar
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
