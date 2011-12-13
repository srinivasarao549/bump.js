/*
 * Vector3 provides static functions for creating and operating on one-dimensional array objects.
 */
(function( window, Bump ) {

  Bump.Vector3 = Bump.type( {
    typeMembers : {
      create : function( x, y, z ) {
        var dest = [];

        dest[0] = x || 0;
        dest[1] = y || 0;
        dest[2] = z || 0;

        return dest;
      },

      add : function( vec, vec2, dest ) {
        if( !dest || vec == dest ){
          vec[0] += vec2[0];
          vec[1] += vec2[1];
          vec[2] += vec2[2];

          return vec;
        }

        dest[0] = vec[0] + vec2[0];
        dest[1] = vec[1] + vec2[1];
        dest[2] = vec[2] + vec2[2];

        return dest;
      },

      subtract : function( vec, vec2, dest ) {
        if( !dest || vec == dest ){
          vec[0] -= vec2[0];
          vec[1] -= vec2[1];
          vec[2] -= vec2[2];

          return vec;
        }

        dest[0] = vec[0] - vec2[0];
        dest[1] = vec[1] - vec2[1];
        dest[2] = vec[2] - vec2[2];

        return dest;
      },

      multiply : function( vec, scalar, dest ) {
        if( !dest || vec == dest ){
          vec[0] *= scalar;
          vec[1] *= scalar;
          vec[2] *= scalar;

          return vec;
        }

        dest[0] = vec[0] * scalar;
        dest[1] = vec[1] * scalar;
        dest[2] = vec[2] * scalar;

        return dest;
      },

      divide : function( vec, scalar, dest ) {
        if( !dest || vec == dest ){
          vec[0] /= scalar;
          vec[1] /= scalar;
          vec[2] /= scalar;

          return vec;
        }

        dest[0] = vec[0] / scalar;
        dest[1] = vec[1] / scalar;
        dest[2] = vec[2] / scalar;

        return dest;
      },

      dot : function( vec, vec2 ) {
        return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
      },

      length2 : function( vec ) {
        return Bump.Vector3.dot( vec, vec );
      },

      length : function( vec ) {
        return Math.sqrt( Bump.Vector3.length2( vec, vec ) );
      }
    }
  } );
} )( this, this.Bump );