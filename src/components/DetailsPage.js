import { IonBackButton, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonPopover, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { createNewGuestSession, getCredits, getDetails, submitNewRating } from '../services/API';

export const DetailsPage = () => {
  const history = useHistory();
  const item = history.location.state.item;
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  const [rating, setRating] = React.useState('');
  const [showToast1, setShowToast1] = React.useState(false);
  const [details, setDetails] = React.useState([]);
  const [actors, setActors] = React.useState([]);

  const createGuestSession = (callback) => {
    createNewGuestSession().then(response => {
      if (response?.data?.success)
        callback(response?.data?.guest_session_id);
      console.log(response)
    });
  }

  const submitRating = (sessionId, ratingValue) => {
    submitNewRating(sessionId, ratingValue).then(response => {
      console.log('success');
      setShowPopover(false);
      setShowToast1(true);
    });
  };

  const newRating = (rating) => {
    createGuestSession((guestSessionId) => {
      submitRating(guestSessionId, rating);
    });
  }

  useEffect(() => {
    if (details.length !== 0) return;
    getDetails(item?.id).then(response => {
      setDetails(response?.data);
    });

    getCredits(item?.id).then(creditsResponse => {
      let credits = creditsResponse.data;
      let cast = [];
      for (let i = 0; i < 5; i++) {
        let element = credits.cast[i];
        cast.push(element.name);
      }
      setActors(cast.join(', '));
    });
  }, [details]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{item.title}</IonTitle>

          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonBadge onClick={
              (e) => {
                e.persist();
                setShowPopover({ showPopover: true, event: e })
              }}
              color="primary" style={{ marginRight: "10px" }}>{item?.vote_average}</IonBadge>
            <IonPopover
              cssClass='my-custom-class'
              event={popoverState.event}
              isOpen={popoverState.showPopover}
              onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
            >
              <IonContent>
                <IonToast
                  isOpen={showToast1}
                  onDidDismiss={() => setShowToast1(false)}
                  message="Your rating has been submited."
                  duration={2000}
                />
                <IonCard>
                  <IonGrid>
                    <IonRow>
                      <IonLabel>Enter new rating</IonLabel>
                    </IonRow>
                    <IonRow>

                      <IonCol>
                        <IonInput value={rating} placeholder="Rating" onIonChange={e => setRating(e.detail.value)}></IonInput>
                      </IonCol>
                      <IonCol>
                        <IonButton onClick={() => { newRating(rating) }}>Send</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCard>
              </IonContent>
            </IonPopover>

          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonImg src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} />
              </IonCol>
              <IonCol >
                <IonCardHeader>
                  <IonCardSubtitle>{item.release_date}</IonCardSubtitle>
                  <IonCardTitle>{item.original_title}</IonCardTitle>
                </IonCardHeader>
                <p><strong>Genres:</strong></p>
                {details ? details?.genres?.map(item => <p>{item.name}</p>) : null}
                <p><strong>Actors:</strong></p>
                <p>{actors}</p>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonCardContent>
            {item.overview}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage >
  );
};
