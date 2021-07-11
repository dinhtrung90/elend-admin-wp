import { authService } from '../services/auth.service'
import { employerService } from '../services/employer.service'
import { userService } from '../services/user.service'
import { permissionService } from '../services/permission.service'

const api = {
  authService,
  employerService,
  permissionService,
  userService,
}

export default api
