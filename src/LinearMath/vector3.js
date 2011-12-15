/*
 * Vector3 provides static functions for creating and operating on one-dimensional array objects.
 */
(function( window, Bump ) {

  Bump.SIMD_EPSILON = Math.pow(2, -52);

  Bump.Vector3 = Bump.type( {
    typeMembers : {
      create : function( x, y, z ) {
        var dest = [];

        dest[0] = x || 0;
        dest[1] = y || 0;
        dest[2] = z || 0;
        dest[3] = 0;

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

      // scalar multiplication
      multiply : function( vec, scalar, dest ) {
        if( !dest || vec == dest ) {
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

      // element-wise vector multiplication
      scale : function( vec, vec2, dest ) {
        if( !dest || vec == dest ) {
          vec[0] *= vec2[0];
          vec[1] *= vec2[1];
          vec[2] *= vec2[2];

          return vec;
        }

        dest[0] = vec[0] * vec2[0];
        dest[1] = vec[1] * vec2[1];
        dest[2] = vec[2] * vec2[2];

        return dest;
      },

      // scalar division
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

      // element-wise vector division
      // (not happy with the naming scheme, come up with something better)
      divideElements : function( vec, vec2, dest ) {
        if( !dest || vec == dest ){
          vec[0] /= vec2[0];
          vec[1] /= vec2[1];
          vec[2] /= vec2[2];

          return vec;
        }

        dest[0] = vec[0] / vec2[0];
        dest[1] = vec[1] / vec2[1];
        dest[2] = vec[2] / vec2[2];

        return dest;
      },

      dot : function( vec, vec2 ) {
        return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
      },

      length2 : function( vec ) {
        //return Bump.Vector3.dot( vec, vec );
        return this.dot( vec, vec );
      },

      length : function( vec ) {
        return Math.sqrt( this.length2( vec, vec ) );
      },

      distance2 : function( vec, vec2 ) {
        return this.length2( this.subtract( vec2, vec, this.create() ) );
      },

      distance : function( vec, vec2 ) {
        return this.length( this.subtract( vec2, vec, this.create() ) );
      },

      safeNormalize : function( vec ) {
        var absVec = this.absolute( vec, this.create() ),
        maxIndex = this.maxAxis( absVec );

        if( absVec[ maxIndex ] > 0 ) {
          this.divide( vec, absVec[ maxIndex ] );
          return this.divide( vec, this.length( vec ) );
        }

        this.setValue( vec, 1, 0, 0 );
        return vec;
      },

      normalize : function( vec ) {
        return this.divide( vec, this.length( vec ) );
      },

      normalized : function( vec, dest ) {
        dest = dest || this.create();
        return this.divide( vec, this.length( vec ), dest );
      },

      /** Return a rotated version of vec
       * param wAxis The axis to rotate about
       * param angle The angle to rotate by */
      rotate : function( vec, wAxis, angle, dest ) {
        dest = dest || vec;
        console.log('dest = ' + dest);

        // wAxis must be a unit length vector
        var o = this.multiply( wAxis, this.dot( wAxis, vec ), this.create() ),
        x = this.subtract( vec, o, this.create() ),
        y = this.cross( wAxis, vec, this.create() );

        console.log('o = ' + o);
        console.log('vec = ' + vec);

        return this.add( this.add( o, this.multiply( x, Math.cos( angle ) ) ),
                         this.multiply( y, Math.sin( angle ) ), dest );
      },

      // Return the angle between vec and vec2
      angle : function( vec, vec2 ) {
        var s = Math.sqrt( this.length2( vec ) * this.length2( vec2 ) );
        // btFullAssert( s != btScalar( 0.0 ) )
        return Math.acos( this.dot( vec, vec2 ) / s );
      },

      // Return a vector with the absolute values of each element
      absolute : function( vec, dest ) {
        if( !dest || vec == dest ) {
          vec[0] = Math.abs( vec[0] );
          vec[1] = Math.abs( vec[1] );
          vec[2] = Math.abs( vec[2] );
          return vec;
        }

        dest[0] = Math.abs( vec[0] );
        dest[1] = Math.abs( vec[1] );
        dest[2] = Math.abs( vec[2] );

        return dest;
      },

      // Return the cross product between the two vectors, using dest if provided.
      // Otherwise, the result overwrites vec
      cross : function( vec, vec2, dest ) {
        if( !dest ) {
          dest = vec;
        }
        var x = vec[1] * vec2[2] - vec[2] * vec2[1],
        y = vec[2] * vec2[0] - vec[0] * vec2[2],
        z = vec[0] * vec2[1] - vec[1] * vec2[0];

        dest[0] = x;
        dest[1] = y;
        dest[2] = z;

        return dest;
      },

      // Return the triple cross product between the three vectors
      triple : function( vec, vec2, vec3) {
        return vec[0] * ( vec2[1] * vec3[2] - vec2[2] * vec3[1] ) +
          vec[1] * ( vec2[2] * vec3[0] - vec2[0] * vec3[2] ) +
          vec[2] * ( vec2[0] * vec3[1] - vec2[1] * vec3[0] );
      },

      // Return the axis with the smallest value
      // Note: return values are 0, 1, 2 for x, y, or z
      minAxis : function( vec ) {
        return vec[0] < vec[1] ? ( vec[0] < vec[2] ? 0 : 2 ) : ( vec[1] < vec[2] ? 1 : 2 );
      },

      // Return the axis with the largest value
      // Note: return values are 0, 1, 2 for x, y, or z
      maxAxis : function( vec ) {
        return vec[0] > vec[1] ? ( vec[0] > vec[2] ? 0 : 2 ) : ( vec[1] > vec[2] ? 1 : 2 );
      },

      // Note : the furthest and closest axis functions seem backwards...?
      furthestAxis : function( vec ) {
        return this.minAxis( this.absolute( vec, this.create() ) );
      },

      closestAxis : function( vec ) {
        return this.maxAxis( this.absolute( vec, this.create() ) );
      },

      // Linearly interpolate between the two vectors, putting result in dest, or vec if dest is not specified
      setInterpolate3 : function( vec, vec2, rt, dest ) {
        if( !dest ){
          dest = vec;
        }

        var s = 1 - rt;
        dest[0] = s * vec[0] + rt * vec2[0];
        dest[1] = s * vec[1] + rt * vec2[1];
        dest[2] = s * vec[2] + rt * vec2[2];

        return dest;
      },

      // not sure if this needs to exist as well as setInterpolate3...
      lerp : function( vec, vec2, t, dest ) {
        return this.setInterpolate3( vec, vec2, t, dest );
      },

      // not sure that get/set funcs make sense, so omitting the following:
      // getX,
      // getY,
      // getZ,
      // setX,
      // setY,
      // setZ,
      // getW,
      // x
      // y
      // z
      // w

      // element-wise comparison of vectors ( note : ignores w values )
      equal : function( vec, vec2 ) {
        return ( vec[0] == vec2[0] ) && ( vec[1] == vec2[1] ) && ( vec[2] == vec2[2] );
      },

      notEqual : function( vec, vec2 ) {
        return ( vec[0] != vec2[0] ) || ( vec[1] != vec2[1] ) || ( vec[2] != vec2[2] );
      },

      // set vec's elements to be the max of its original elements and vec2's elements
      setMax : function( vec, vec2 ) {
        vec[0] = Math.max( vec[0], vec2[0] );
        vec[1] = Math.max( vec[1], vec2[1] );
        vec[2] = Math.max( vec[2], vec2[2] );
        vec[3] = Math.max( vec[3], vec2[3] );

        return vec;
      },

      // set vec's elements to be the min of its original elements and vec2's elements
      setMin : function( vec, vec2 ) {
        vec[0] = Math.min( vec[0], vec2[0] );
        vec[1] = Math.min( vec[1], vec2[1] );
        vec[2] = Math.min( vec[2], vec2[2] );
        vec[3] = Math.min( vec[3], vec2[3] );

        return vec;
      },

      // set vec's elements equal to x, y, z, w
      setValue : function( vec, x, y, z ) {
        vec[0] = x;
        vec[1] = y;
        vec[2] = z;
        vec[3] = 0;

        return vec;
      },

      // set the column(?) vectors v0, v1, v2 equal to the columns of the skew symmetric matrix
      getSkewSymmetricMatrix : function( vec, v0, v1, v2 ) {
        this.setValue( v0, 0, -vec[2], vec[1] );
        this.setValue( v1, vec[2], 0, -vec[0] );
        this.setValue( v2, -vec[1], vec[0], 0 );
      },

      setZero : function( vec ) {
        this.setValue( vec, 0, 0, 0 );

        return vec;
      },

      isZero : function( vec ) {
        return ( vec[0] === 0 ) && ( vec[1] === 0 ) && ( vec[2] === 0 );
      },

      fuzzyZero : function( vec ) {
        return this.length2( vec ) < Bump.SIMD_EPSILON;
      }

      // todo : serialization methods
    }
  } );
} )( this, this.Bump );