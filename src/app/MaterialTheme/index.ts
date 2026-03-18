import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		mode: 'light' as const,
		background: {
			default: '#f8f3ed',
			paper: '#fffefc',
		},
		primary: {
			contrastText: '#fff7f1',
			main: '#7a4734',
		},
		secondary: {
			contrastText: '#2f2722',
			main: '#c27a5d',
		},
		text: {
			primary: '#2f2722',
			secondary: '#7b6758',
			dark: common.black,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { background: '#f8f3ed', height: '100%', minHeight: '100%' },
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
