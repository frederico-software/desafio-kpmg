import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AboutPage from '../components/AboutPage';
import './Tab3.css';

const Tab3 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About the App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About the App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AboutPage />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
