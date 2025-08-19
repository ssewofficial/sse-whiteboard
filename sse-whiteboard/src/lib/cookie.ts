import Cookies from "js-cookie";

interface CookieSetOptions {
  name: "accessToken" | "refreshToken";
  value: string;

  /**
   * Enables the [`HttpOnly` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.6).
   * When enabled, clients will not allow client-side JavaScript to see the cookie in `document.cookie`.
   */
  httpOnly?: boolean;

  /**
   * Specifies the `number` (in seconds) to be the value for the [`Max-Age` `Set-Cookie` attribute](https://tools.ietf.org/html/rfc6265#section-5.2.2).
   *
   * The [cookie storage model specification](https://tools.ietf.org/html/rfc6265#section-5.3) states that if both `expires` and
   * `maxAge` are set, then `maxAge` takes precedence, but it is possible not all clients by obey this,
   * so if both are set, they should point to the same date and time.
   */
  maxAge?: number;

  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date | undefined;

  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string | undefined;

  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string | undefined;

  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean | undefined;

  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;

  /**
   * Enables the [`Partitioned` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-cutler-httpbis-partitioned-cookies/).
   * When enabled, clients will only send the cookie back when the current domain _and_ top-level domain matches.
   *
   * This is an attribute that has not yet been fully standardized, and may change in the future.
   * This also means clients may ignore this attribute until they understand it. More information
   * about can be found in [the proposal](https://github.com/privacycg/CHIPS).
   */
  partitioned?: boolean;

  /**
   * Specifies the value for the [`Priority` `Set-Cookie` attribute](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
   *
   * - `'low'` will set the `Priority` attribute to `Low`.
   * - `'medium'` will set the `Priority` attribute to `Medium`, the default priority when not set.
   * - `'high'` will set the `Priority` attribute to `High`.
   *
   * More information about priority levels can be found in [the specification](https://tools.ietf.org/html/draft-west-cookie-priority-00#section-4.1).
   */
  priority?: "low" | "medium" | "high";

  /**
   * An attribute which will be serialized, conformably to RFC 6265
   * section 5.2.
   */
  [property: string]: any;
}

export const cookieStore = {
  set: ({ name, value, ...options }: CookieSetOptions) => {
    Cookies.set(name, value, options);
  },

  delete: (name: string) => {
    Cookies.remove(name);
  },

  get: (name: string) => {
    const value = Cookies.get(name);
    return { name, value };
  },
};
