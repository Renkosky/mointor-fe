import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@skymointor/react': path.resolve(__dirname, 'node_modules/@skymointor/react'),
      '@skymointor/utils': path.resolve(__dirname, 'node_modules/@skymointor/utils'),
      '@skymointor/core': path.resolve(__dirname, 'node_modules/@skymointor/core'),
      '@skymointor/browser': path.resolve(__dirname, 'node_modules/@skymointor/browser'),
      '@skymointor/shared': path.resolve(__dirname, 'node_modules/@skymointor/shared'),
      '@skymointor/types': path.resolve(__dirname, 'node_modules/@skymointor/types'),
      // 添加其他需要的别名
    },
  },
});
