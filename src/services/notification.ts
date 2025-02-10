interface NotificationCreateParams {
  user_id: number;
  from_user_id: number;
  notification_type: string;
  message?: string;
}

export class NotificationService {
  static async create(params: NotificationCreateParams) {
    // 通知の作成処理
    // TODO: 実際のNotification作成処理を実装
    return Promise.resolve();
  }
}
