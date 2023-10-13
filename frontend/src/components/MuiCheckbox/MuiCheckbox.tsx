import {createConnector, registerConnector} from 'Frontend/src/react/react-utils';
import {Checkbox} from '@mui/material';

registerConnector('MuiCheckbox', Checkbox, createConnector(Checkbox));

export default Checkbox;
