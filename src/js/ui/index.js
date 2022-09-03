import { header } from "./header.js"
import { updateLoginVisibility } from "./auth.js"
import { modals } from "./modals.js"
// import { reactions } from "./reactions.js"
import { footer } from "./footer.js"

export default () => {
  header()
  modals()
  footer()
  updateLoginVisibility()
}
