import PushNotification from "react-native-push-notification"

export const NTF_INICIAR_VIAGEM = '1';
export const NTF_AVISAR_REVISAO = '2';
export const NTF_LEMBRAR_CONCLUIR_VIAGEM = '3';

const getTitle = code => {
    switch (code) {
        case NTF_INICIAR_VIAGEM:
            return 'Viagem iniciada'
        case NTF_LEMBRAR_CONCLUIR_VIAGEM:
            return 'Viagem em andamento'
        default:
            return 'ViagensPMO'
    }
}

const getMessage = code => {
    switch (code) {
        case NTF_INICIAR_VIAGEM: 
            return 'Siga as leis de trânsito!'
        case NTF_LEMBRAR_CONCLUIR_VIAGEM: 
            return 'Oi, você ainda está viajando? uma viagem está ativa!'
        default:
            return 'ViagensPMO'
    }
}

export const notificar = id => {
    PushNotification.localNotification({
        id: id,
        channelId: "notify-local",
        title: getTitle(id),
        message: getMessage(id),
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    });
}

export const agendar_notificacao = (id, interval) => {
    PushNotification.localNotificationSchedule({
        id: id,
        channelId: "notify-local", // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: getTitle(id),
        message: getMessage(id),
        date: new Date(Date.now() + interval), // 1 dia após iniciar
        repeatType: 'time',
        repeatTime: interval,
    });
}

export const cancelar_notificacao = id => {
    if (typeof id !== 'undefined') {
        PushNotification.cancelLocalNotifications({ id });
    } else {
        PushNotification.cancelAllLocalNotifications();
    }
}