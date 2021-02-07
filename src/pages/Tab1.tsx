import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
// import {DashboardPage} from '../components/DashboardPage';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import DashboardPage from '../components/DashboardPage';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <DashboardPage />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
