export const Environment = {
    production: false,
    base_url: 'https://test.softrig.com/api/',
    authority: 'https://test-login.softrig.com',
    client_id: '73461336-98ba-47e7-9f3e-efbc5ed16157',
    redirect_uri: 'http://localhost:4200/signin-oidc',
    post_logout_redirect_uri: 'http://localhost:4200/',
    silent_redirect_uri: 'http://localhost:4200/silent_renew.html',
    automaticSilentRenew: true,
    response_type: 'code',
    scope: 'openid profile AppFramework',
    filterProtocolClaims: true, // prevents protocol level claims such as nbf, iss, at_hash, and nonce from being extracted from the identity token as profile data
    loadUserInfo: true
  };
  