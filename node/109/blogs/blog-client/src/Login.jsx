import './Login.css';
import useForm from './useForm';

export default function Login(props) {
  const { setUserName, setError } = props;

  const [formData, setFormData] = useForm({
    userName: '',
    password: ''
  })

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      setUserName(formData.userName);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  async function register(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <form id="login" onSubmit={login}>
      <label>name:
        <input name="userName" required minLength={3} maxLength={20} value={formData.userName} onChange={setFormData} />
      </label>

      <label>password:
        <input type="password" name="password" minLength={3} maxLength={30} required pattern="^[a-zA-Z0-9]{3,30}$" value={formData.password} onChange={setFormData} />
      </label>

      <button>login</button>

      <button type="button" onClick={register}>register</button>
    </form>
  )
}
