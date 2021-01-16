type AcceptedNadeNotification = {
  createdAt: Date;
  id: string;
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  thumnailUrl?: string;
  type: "accepted-nade";
  viewed: boolean;
};

type ReportNotification = {
  id: string;
  subjectSteamId: string; // Reciever of notification
  viewed: boolean;
  createdAt: Date;
  type: "report";
};

type DeclinedNadeNotification = {
  createdAt: Date;
  id: string;
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  thumnailUrl?: string;
  type: "declined-nade";
  viewed: boolean;
};

export type FavoriteNotification = {
  byNickname: string;
  bySteamId: string;
  createdAt: Date;
  id: string;
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  thumnailUrl?: string;
  type: "favorite";
  viewed: boolean;
};

type NewContactNotification = {
  createdAt: Date;
  id: string;
  subjectSteamId: string;
  type: "contact-msg";
  viewed: boolean;
};

type NewNadeNotification = {
  createdAt: Date;
  id: string;
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  type: "new-nade";
  viewed: boolean;
};

type NewCommentNotification = {
  byNickname: string;
  bySteamId: string;
  createdAt: Date;
  id: string;
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  thumnailUrl?: string;
  type: "new-comment";
  viewed: boolean;
};

export type FavoriteNotificationAgregate = {
  id: string;
  type: "favorite-agregate";
  nadeId: string;
  nadeSlug?: string;
  byNickname: string;
  count: number;
  viewed: boolean;
  createdAt: Date;
  thumnailUrl?: string;
};

export type Notification =
  | AcceptedNadeNotification
  | DeclinedNadeNotification
  | FavoriteNotification
  | FavoriteNotificationAgregate
  | NewContactNotification
  | NewNadeNotification
  | NewCommentNotification
  | ReportNotification;
