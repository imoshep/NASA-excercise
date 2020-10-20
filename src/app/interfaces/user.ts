export interface UserFromFirebase {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    a?: string;
    b?: string;
    creationTime?: string;
    lastSignInTime?: string;
  }
  phoneNumber?: string | number;
  photoUrl?: string;
  providerData?: object[];
  refreshToken: string;
}
