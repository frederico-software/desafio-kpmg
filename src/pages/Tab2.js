import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { MoviesList } from '../components/MoviesList';
import './Tab2.css';

const Tab2 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movies</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MoviesList></MoviesList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
